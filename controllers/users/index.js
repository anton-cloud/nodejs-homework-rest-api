const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const { getAvatar, addAvatar } = require("./avatars.js");

module.exports = {
  signup,
  login,
  logout,
  current,
  getAvatar,
  addAvatar
};
