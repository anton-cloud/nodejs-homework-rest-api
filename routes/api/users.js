const express = require("express");

const { controllerWrapper, validation, authenticate } = require("../../middlewares");
const { joinUserSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joinUserSchema), controllerWrapper(ctrl.signup));

router.post("/login", validation(joinUserSchema), controllerWrapper(ctrl.login));

router.post("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, validation(joinUserSchema), controllerWrapper(ctrl.current));

module.exports = router;
