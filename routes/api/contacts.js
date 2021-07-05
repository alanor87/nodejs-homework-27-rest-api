const express = require('express');
const router = express.Router();
const Joi = require('joi');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model');

const newContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(/^.+[@].+$/),
  phone: Joi.string().pattern(/^\(\d+\) \d+-\d+$/).required()
})

router.get('/', async (req, res, next) => {
  const contactList = await listContacts()
  console.log(contactList)
  res.status(200).json(contactList)
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId)
  if (!contact) res.status(404).json({ message: 'Not found' })
  res.status(200).json(contact)
})

router.post('/', async (req, res, next) => {
  const { error } = newContactSchema.validate(req.body);
  if (error) {
    res.status(400).send({ message: 'missing required name field' });
    return;
  }
  res.status(201).send(await addContact(req.body));
})

router.patch('/:contactId', async (req, res, next) => {
  if (req.body.name && req.body.email && req.body.phone) {
    const updateStatus = await updateContact(req.params.contactId, req.body)
    if (updateStatus) {
      res.status(201).send(updateStatus);
      return;
    }
    res.status(201).send({ message: 'Not found' });
    return;
  }
  res.status(400).send({ message: 'missing fields' })
})

router.delete('/:contactId', async (req, res, next) => {
  const status = await removeContact(req.params.contactId)
  if (status) {
    res.send({ message: 'contact deleted' })
    return
  }
  res.status(404).send({ message: 'Not found' });
})

module.exports = router
