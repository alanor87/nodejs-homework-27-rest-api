const router = require('express').Router();
const { validateUserStatus } = require('../../utils/validate/user');
const { User: service } = require('../../services');
const authenticate = require('../../middleware/authenticate')
const jwt = require('jsonwebtoken');


router.get('/current',
    authenticate,
    (req, res) => {
        const { email, subscription } = req.user;
        res.json({
            status: 'success',
            code: 200,
            body: { email, subscription }
        })
    })

router.post('/signup', validateUserStatus, async (req, res, next) => {
    const { email, password, subscription } = req.body;
    const result = await service.getOne({ email: email });
    if (!result) {
        service.addOne({ email, password, subscription });
        res.json({
            "Status": 201,
            "Content-Type": "application/json",
            body: {
                user: {
                    email, subscription
                }
            }
        });
        return;
    }
    res.json({
        status: 500,
        message: "Email already exists!",
    });
})

router.post('/login', validateUserStatus, async (req, res, next) => {
    const { email, password } = req.body;
    const user = await service.getOne({ email });
    try {
        if (!user || !user.comparePassword(password)) {
            res.status(400)
                .json({
                    status: 'error',
                    code: 400,
                    message: 'Email or password is wrong',
                })
        }
        const { SECRET_KEY } = process.env;
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY);
        await service.updateById(user._id, { token });
        res.json({
            status: 'Success',
            code: 200,
            data: {
                token: token,
                user: {
                    email: user.email,
                    subscription: user.subscription,
                },
            }
        })
    }
    catch (error) {
        next(error);
    }
});

router.post('/logout',
    authenticate,
    (req, res) => {
        service.updateById(req.user._id, { token: null });
        res.json({
            code: 204,
            status: "No content",
        })
    })

module.exports = router;