const Contact = require("../../model/contact");
const getContactById = async (req, res, next) => {
  const userId = req.user.id;
  const { contactId } = req.params;
  try {
    const result = await Contact.findOne({
      _id: contactId,
      owner: userId,
    }).populate({
      path: "owner",
      select: "email subscription",
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
module.exports = getContactById;
