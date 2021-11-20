const fs = require("fs/promises");
const path = require("path");
var Jimp = require("jimp");
const { User } = require("../../models");

const avatarsDirectory = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res) => {
  const { path: tempStorage, originalname } = req.file; //старий шлях файлу

  const avatarURL = req.user.avatarURL;
  const avatar = await Jimp.read(tempStorage);
  await avatar
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempStorage); //центрування (250х250 розміри, перезбереження)

  const [extention] = originalname.split(".").reverse();
  const newAvatarName = `user_${req.user._id}.${extention}`;
  const resultStorage = path.join(avatarsDirectory, newAvatarName);
  await fs.rename(tempStorage, resultStorage);

  const userWithChangedAvatarUrl = await User.findOneAndUpdate({ avatarURL }, { avatarURL: resultStorage }, { new: true });

  if (!userWithChangedAvatarUrl) {
    res.status(404).json({
      message: "Not authorized"
    });
  }

  res.json({
    avatarURL
  });
};

module.exports = updateAvatar;
