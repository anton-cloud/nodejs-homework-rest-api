const { User } = require("../../models");

const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { email, password, subscription, token } = req.body;
  const result = await User.findOne({ email });
  if (result) {
    res.status(409).json({
      message: "Email in use"
    });
    return;
  }

  const newUser = {
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    subscription,
    token
  };

  const addedContact = await User.create(newUser);
  res.status(201).json({
    user: { email: addedContact.email, subscription: addedContact.subscription }
  });
};

module.exports = signup;
