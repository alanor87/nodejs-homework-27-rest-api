const Contact = require("../../model/contact");
const removeContact = async (req, res, next) => {
  const userId = req.user.id
  const { contactId } = req.params;
  try {
    const result = await Contact.findOneAndRemove({ _id: contactId, owner: userId });
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
module.exports = removeContact;
