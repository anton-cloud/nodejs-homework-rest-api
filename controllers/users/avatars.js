const fs = require("fs/promises");
const path = require("path");
var Jimp = require("jimp");
const { User } = require("../../models");

const avatarsDirectory = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res) => {
  const { path: tempStorage, originalname } = req.file; //старий шлях файлу
  console.log(`$=======>${tempStorage}`);
  console.log(`$=======>${originalname}`);
  console.log(`$=======>${req.user.avatarURL}`);
  const avatarURL = req.user.avatarURL;
  const avatar = await Jimp.read(tempStorage);
  await avatar
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempStorage); //центрування (250х250 розміри, перезбереження)

  // const result = await User.findOne(avatarURL, { new: true });
  const [extention] = originalname.split(".").reverse();
  const newAvatarName = `user_${req.user._id}.${extention}`;
  const resultStorage = path.join(avatarsDirectory, newAvatarName);
  await fs.rename(tempStorage, resultStorage);
  const newAvatarURL = await User.findOneAndUpdate({ avatarURL: avatarURL }, { avatarURL: resultStorage }, { new: true });

  if (!newAvatarURL) {
    res.status(404).json({
      message: "Not authorized"
    });
  }

  res.json({
    avatarURL
  });
  // ========================================
  // try {
  //   const newAvatar = {
  //     avatar: "public/avatars/default.png"
  //   };

  //   const result = User.create(newAvatar);
  //   const [extention] = originalname.split(".").reverse();
  //   const newFileName = `user_${result._id}.${extention}`;
  //   const resultStorage = path.join(avatarsDirectory, newFileName);

  // await fs.rename(tempStorage, resultStorage);
  //   const avatar = path.join("./avatars", newFileName);
  //   const user = await User.findByIdAndUpdate(result._id, { avatar }, { new: true });
  //   res.status(201).json({
  //     result: user
  //   });
  // } catch (error) {
  //   await fs.unlink(tempStorage); //видалення
  //   throw error;
  // }
};

module.exports = updateAvatar;

// =======================================================

// const fs = require("fs/promises");
// const path = require("path");
// const { User } = require("../../models");

// const avatarsDirectory = path.join(__dirname, "../../public/avatars");

// const addAvatar = async (req, res) => {
//   const { path: tempStorage, originalname } = req.file; //старий шлях файлу
//   try {
//     const newUser = {
//       name: req.body.name,
//       photo: "public/avatars/default.png"
//     };

//     const result = User.create(newUser);
//     const [extention] = originalname.split(".").reverse();
//     const newFileName = `user_${result._id}.${extention}`;
//     const resultStorage = path.join(avatarsDirectory, newFileName);
//     await fs.rename(tempStorage, resultStorage);
//     const photo = path.join("./avatars", newFileName);
//     const user = await User.findByIdAndUpdate(result._id, { photo }, { new: true });
//     res.status(201).json({
//       result: user
//     });
//     // const resultStorage = path.join(avatarsDirectory, originalname); //новий шлях файлу
//     // await fs.rename(tempStorage, resultStorage);
//     // const avatar = path.join("/avatars", originalname);
//     // const newAvatar = {
//     //   name: req.body.name,
//     //   photo: ""
//     // };
//   } catch (error) {
//     await fs.unlink(tempStorage); //видалення
//     throw error;
//   }
// };

// const getAvatar = async (req, res) => {
//   const result = await User.find({});
//   res.json(result);
// };

// module.exports = { addAvatar, getAvatar };
