const express = require("express");

const { controllerWrapper, validation, authenticate } = require("../../middlewares");
const { joinUserSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joinUserSchema), controllerWrapper(ctrl.signup));

router.post("/login", validation(joinUserSchema), controllerWrapper(ctrl.login));

router.post("/logout", authenticate, controllerWrapper(ctrl.logout));

router.get("/current", authenticate, validation(joinUserSchema), controllerWrapper(ctrl.current));

// ====================================
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

const tempDirectory = path.join(__dirname, "../../temp");
const avatarsDirectory = path.join(__dirname, "../../public/avatars");

const multerSetting = multer.diskStorage({
  //куди зберегти
  destination: (req, file, cb) => {
    cb(null, tempDirectory);
  },
  //під яким ім'ям
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  //обмеження по розміру
  limits: {
    fileSize: 2058
  }
});

//відділяє файл і текст
const uploadMiddleware = multer({
  storage: multerSetting
});

router.post("/avatars", uploadMiddleware.single("photo"), async (req, res) => {
  const { path: tempStorage, originalname } = req.file; //старий шлях файлу
  const resultStorage = path.join(avatarsDirectory, originalname); //новий шлях файлу
  await fs.rename(tempStorage, resultStorage);
});
// ====================================

module.exports = router;
