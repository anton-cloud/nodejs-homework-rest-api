const { Conflict } = require("http-errors");
const { User } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { email, password, subscription, token } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    throw new Conflict("Email in use");
  }

  const newUser = {
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    subscription,
    token
  };

  const addedContact = await User.create(newUser);
  sendSuccessReq(res, { email: addedContact.email, subscription: addedContact.subscription }, 201);
};

module.exports = signup;
