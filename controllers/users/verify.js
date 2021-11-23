const { User } = require("../../models");

const verify = async (res, req) => {
  console.log(res.params);
  const { verificationToken } = res.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
  req.json({ message: "Verification successful" });
};

module.exports = verify;
