const { Schema } = require("mongoose");
const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: [2, "Name cannot be less then 2 letters"],
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
module.exports = contactSchema;
