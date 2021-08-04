const Contact = require("../../model/contact");
const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  const { body } = req;
  try {
    const result = await Contact.findOneAndUpdate({ _id: contactId, owner: userId }, body, {
      new: true,
    });
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = updateContact;
