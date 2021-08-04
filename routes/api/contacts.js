const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validContactUpdateStatus } = require("../../utils/validate/contacts");
const authenticate = require('../../middleware/authenticate');

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post("/", authenticate, ctrl.addContact);

router.delete("/:contactId", authenticate, ctrl.removeContact);

router.patch("/:contactId", authenticate, ctrl.updateContact);
router.patch(
  "/:contactId/favorite",
  authenticate,
  validContactUpdateStatus,
  ctrl.updateContact
);

module.exports = router;
