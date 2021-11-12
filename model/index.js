const fs = require("fs/promises");
const contacts = require("./contacts.json");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");
const updateContacts = async newContacts => {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
};

const listContacts = async () => {
  return contacts;
};

const getContactById = async contactId => {
  const contact = contacts.find(item => String(item.id) === String(contactId));
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async contactId => {
  const idx = contacts.findIndex(item => String(item.id) === String(contactId));
  if (idx === -1) {
    return null;
  }
  const removeContact = contacts[idx];
  contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContact;
};

const addContact = async ({ name, email, phone }) => {
  console.log(v4());
  const newContact = { name, email, phone, id: v4() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const idx = contacts.findIndex(item => String(item.id) === String(contactId));
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, id: contactId };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
};
