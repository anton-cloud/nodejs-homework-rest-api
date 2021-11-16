const { NotFound } = require("http-errors");

const { Contact } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const changedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!changedContact) {
    throw NotFound("Not found");
  }
  sendSuccessReq(res, changedContact);
};

module.exports = updateContact;
