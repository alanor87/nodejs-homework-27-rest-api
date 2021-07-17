const Contact = require("../model/contact");
const addContact = async (req, res, next) => {
  const { body } = req;
  try {
    const result = await Contact.create(body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      error.code = 400;
    }
    next(error);
  }
};
module.exports = addContact;
