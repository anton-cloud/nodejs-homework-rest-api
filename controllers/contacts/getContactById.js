const { NotFound } = require("http-errors");
const { Contact } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new NotFound("Not found");
  }

  sendSuccessReq(res, contact);
};

module.exports = getContactById;
