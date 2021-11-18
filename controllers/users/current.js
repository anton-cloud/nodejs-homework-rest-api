const { User } = require("../../models");

const current = async (req, res) => {
  const id = req.user._id;
  console.log(id);
  const contact = await User.findById(id);
  res.json({
    email: contact.email,
    subscription: contact.subscription
  });
};

module.exports = current;
