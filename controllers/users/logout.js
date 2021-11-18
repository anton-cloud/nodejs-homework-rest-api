const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    res.status(401).json({
      message: "Not authorized"
    });
    return;
  }
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json();
};

module.exports = logout;
