const passport = require('passport');

const authenticate = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        const headerAuth = req.get("authorization");
        let token = null;
        if (headerAuth) {
            token = headerAuth.split(" ")[1];
        }
        if (err || !user || token !== user?.token) {
            return res.status(401).json({
                status: "error",
                code: 401,
                message: "Invalid credentials",
            });
        }

        req.user = user;
        return next();
    })(req, res, next);
};

module.exports = authenticate;