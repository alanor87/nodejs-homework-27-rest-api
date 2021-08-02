const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validContactUpdateStatus } = require("../../utils/validate/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.patch("/:contactId", ctrl.updateContact);
router.patch(
  "/:contactId/favorite",
  validContactUpdateStatus,
  ctrl.updateContact
);

module.exports = router;
