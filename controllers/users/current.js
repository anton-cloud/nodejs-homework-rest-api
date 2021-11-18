const current = async (req, res) => {
  res.json({
    email: req.user.email,
    subscription: req.user.subscription
  });
};

module.exports = current;
