const express = require("express");
const { controllerWrapper, validation } = require("../../middlewares");
const { joinContactSchema } = require("../../models/contacts");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", controllerWrapper(ctrl.listContacts));

router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post("/", validation(joinContactSchema), controllerWrapper(ctrl.addContact));

router.delete("/:contactId", controllerWrapper(ctrl.removeContact));

router.put("/:contactId", validation(joinContactSchema), controllerWrapper(ctrl.updateContact));

router.patch("/:contactId", controllerWrapper(ctrl.updateFavorite));

module.exports = router;
