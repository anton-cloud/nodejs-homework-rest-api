const { Unauthorized, NotFound } = require("http-errors");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new Unauthorized("Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    throw new Unauthorized("Not authorized");//!!!!!!!!!!
  }
};

module.exports = authenticate;
