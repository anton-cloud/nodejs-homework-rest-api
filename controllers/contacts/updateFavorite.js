const { NotFound } = require("http-errors");
const { Contact } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  console.log(contactId, favorite);
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

  if (!result) {
    throw NotFound("Not found");
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "missing field favorite",
      status: 400
    });
  }

  sendSuccessReq(res, result);
};
module.exports = updateFavorite;
