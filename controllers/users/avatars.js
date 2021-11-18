const fs = require("fs/promises");
const path = require("path");

const avatarsDirectory = path.join(__dirname, "../../public/avatars");

console.log(avatarsDirectory);

const addAvatar = async (req, res) => {
  const { path: tempStorage, originalname } = req.file; //старий шлях файлу
  const resultStorage = path.join(avatarsDirectory, originalname); //новий шлях файлу
  await fs.rename(tempStorage, resultStorage);
};

const getAvatar = async (req, res) => {
  res.json([
    {
      name: "hw-5",
      photo: "/avatars/5.png"
    }
  ]);
};

module.exports = { addAvatar, getAvatar };
