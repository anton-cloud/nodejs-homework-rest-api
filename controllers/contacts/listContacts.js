const { Contact } = require("../../models");
const { sendSuccessReq } = require("../../helpers");

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find({});

  sendSuccessReq(res, contacts);
};

module.exports = listContacts;
