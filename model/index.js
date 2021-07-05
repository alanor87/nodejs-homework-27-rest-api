const fs = require('fs/promises');
const { v4 } = require('uuid');
const path = require('path');

const listContacts = async () => {
  const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'), 'utf8');
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const queryContact = contacts.find(contact => contact.id === Number(contactId));
  return queryContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const delIndex = contacts.findIndex(contact => contact.id === Number(contactId));
  if (delIndex === -1) return null;
  const newContacts = contacts.filter(contact => contact.id !== Number(contactId));
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(newContacts));
  return 1;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const id = v4();
  const newContact = { ...body, id };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(newContacts));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === Number(contactId));
  console.log(contactId, body);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(contacts));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
