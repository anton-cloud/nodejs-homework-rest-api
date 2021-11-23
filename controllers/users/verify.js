const { User } = require("../../models");

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verifyToken: verificationToken });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
  res.json({ message: "Verification successful" });
};

module.exports = verify;
