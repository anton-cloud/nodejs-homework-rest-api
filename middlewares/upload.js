const path = require("path");
const multer = require("multer");

const tempDirectory = path.join(__dirname, "../temp");

console.log(tempDirectory);

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
const upload = multer({
  storage: multerSetting
});

module.exports = upload;
