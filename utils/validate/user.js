const Joi = require("joi");

const userCreateSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    PushSubscription: Joi.string(),
});

const validate = (schema, body, next) => {
    const { error } = schema.validate(body);
    if (error) {
        return next({
            status: "error",
            code: 400,
            message: "missing field!",
        });
    }
    next();
};

module.exports.validateUserStatus = (req, res, next) => {
    return validate(userCreateSchema, req.body, next);
};
