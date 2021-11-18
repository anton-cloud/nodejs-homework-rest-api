const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });

  if (!result || !bcrypt.compareSync(password, result.password)) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: result._id
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  res.json({
    token,
    user: {
      email: result.email,
      subscription: result.subscription
    }
  });
};

module.exports = login;
