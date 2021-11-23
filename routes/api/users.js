const express = require("express");

const { controllerWrapper, validation, authenticate, upload } = require("../../middlewares");
const { joinUserSchema } = require("../../models/user");
const { joinUserVerifySchema } = require("../../models/userVerify");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joinUserSchema), controllerWrapper(ctrl.signup));

router.post("/login", validation(joinUserSchema), controllerWrapper(ctrl.login));

router.post("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, validation(joinUserSchema), controllerWrapper(ctrl.current));

router.patch("/avatars", authenticate, upload.single("avatar"), controllerWrapper(ctrl.updateAvatar));

router.post("/verify", validation(joinUserVerifySchema), controllerWrapper(ctrl.repeatVerify));

router.get("/verify/:verificationToken", controllerWrapper(ctrl.verify));

module.exports = router;
