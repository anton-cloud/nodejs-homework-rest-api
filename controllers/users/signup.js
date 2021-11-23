const { User } = require("../../models");

const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription, token } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    res.status(409).json({
      message: "Email in use"
    });
    return;
  }

  const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "404" });
  const verifyToken = v4();

  const newUser = {
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    subscription,
    token,
    avatarURL,
    verifyToken
  };

  const addedContact = await User.create(newUser);

  // const data = {
  //   to: email,
  //   subject: "Подтверджение",
  //   html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}"
  //             target="_blank">Click here</a>`
  // };
  const data = {
    to: email,
    subject: "Подтверджение email при регистрации на сайте localhost:3000",
    html: `<a 
              href="http://localhost:3000/api/users/verify/${verifyToken}"
              target="_blank">Подтвердить регистрацию</a>`
  };

  await sendEmail(data);
  res.status(201).json({
    user: { email: addedContact.email, subscription: addedContact.subscription, verifyToken: addedContact.verifyToken }
  });
};

module.exports = signup;
