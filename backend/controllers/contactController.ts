import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { IUserRequest } from '../types/user';

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
const getContacts = async (req: IUserRequest, res: Response) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
const addContact = async (req: any, res: Response) => {
	// res.send('Add contact');
	const { name, email, phone, type } = req.body;
	try {
		const newContact = new Contact({
			name,
			email,
			phone,
			type,
			user: req.user.id,
		});

		const contact = await newContact.save();
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
const updateContact = async (req: any, res: Response) => {
	const { name, email, phone, type } = req.body;

	// Build contact object
	const contactFields: any = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) return res.status(404).json({ msg: 'Contact not found' });

		// Make sure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

// @route     PUT api/contacts/:id
// @desc      Delete contact
// @access    Private
const deleteContact = async (req: any, res: Response) => {
	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) return res.status(404).json({ msg: 'Contact not found' });

		// Make sure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Not authorized' });
		}

		await Contact.findByIdAndRemove(req.params.id);
		res.json({ msg: 'Contact removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

export { getContacts, addContact, updateContact, deleteContact };
