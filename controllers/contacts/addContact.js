const { Contact } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  sendSuccessReq(res, newContact, 201);
};

module.exports = addContact;
