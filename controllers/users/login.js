const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email });

  if (!result || !bcrypt.compareSync(password, result.password) || !result.verify) {
    res.status(401).json({
      message: "Email or password is wrong or email is not verify"
    });
  }

  const payload = {
    id: result._id
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(result._id, { token });

  res.json({
    token,
    user: {
      email: result.email,
      subscription: result.subscription
    }
  });
};

module.exports = login;
