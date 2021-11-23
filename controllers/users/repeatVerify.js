const { User } = require("../../models");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const repeatVerify = async (req, res) => {
  if (!Object.keys(req.body).includes("email")) {
    res.status(400).json({
      message: "missing required field email"
    });
  }

  const { email } = req.body;
  const result = await User.findOne({ email });

  if (!result) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (!result.verify) {
    const verifyToken = v4();
    console.log(result);
    await User.findByIdAndUpdate(result._id, { verifyToken });
    const data = {
      to: email,
      subject: "Подтверджение email при регистрации на сайте localhost:3000",
      html: `<a 
              href="http://localhost:3000/api/users/verify/${verifyToken}"
              target="_blank">Подтвердить регистрацию</a>`
    };
    await sendEmail(data);
    res.json({
      message: "Verification email sent"
    });
  }

  if (result.verify) {
    res.status(404).json({
      message: "Verification has already been passed"
    });
  }
};

module.exports = repeatVerify;
