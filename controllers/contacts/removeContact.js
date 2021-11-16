const { NotFound } = require("http-errors");
const { Contact } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  const removedContact = await Contact.findByIdAndDelete(contactId);

  if (!removedContact) {
    throw new NotFound("Not found");
  }

  sendSuccessReq(res, { message: "contact deleted" });
};

module.exports = removeContact;
