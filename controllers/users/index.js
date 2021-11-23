const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateAvatar = require("./avatars.js");
const verify = require("./verify");
const repeatVerify = require("./repeatVerify");

module.exports = {
  signup,
  login,
  logout,
  current,
  updateAvatar,
  verify,
  repeatVerify
};
