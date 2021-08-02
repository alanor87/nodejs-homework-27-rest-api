const Joi = require("joi");

const contactUpdateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    return next({
      status: "error",
      code: 400,
      message: "missing field favorite",
    });
  }
  next();
};

module.exports.validContactUpdateStatus = (req, res, next) => {
  return validate(contactUpdateStatusSchema, req.body, next);
};
