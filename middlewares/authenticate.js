const { User } = require("../models");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    res.status(401).json({
      message: "Not authorized"
    });
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user.token) {
      res.status(401).json({
        message: "Not authorized"
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized"
    });
    return;
  }
};

module.exports = authenticate;
