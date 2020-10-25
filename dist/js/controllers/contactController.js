"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.addContact = exports.getContacts = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield Contact_1.default.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json(contacts);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.getContacts = getContacts;
// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Add contact');
    const { name, email, phone, type } = req.body;
    try {
        const newContact = new Contact_1.default({
            name,
            email,
            phone,
            type,
            user: req.user.id,
        });
        const contact = yield newContact.save();
        res.json(contact);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.addContact = addContact;
// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, type } = req.body;
    // Build contact object
    const contactFields = {};
    if (name)
        contactFields.name = name;
    if (email)
        contactFields.email = email;
    if (phone)
        contactFields.phone = phone;
    if (type)
        contactFields.type = type;
    try {
        let contact = yield Contact_1.default.findById(req.params.id);
        if (!contact)
            return res.status(404).json({ msg: 'Contact not found' });
        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        contact = yield Contact_1.default.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
        res.json(contact);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.updateContact = updateContact;
// @route     PUT api/contacts/:id
// @desc      Delete contact
// @access    Private
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let contact = yield Contact_1.default.findById(req.params.id);
        if (!contact)
            return res.status(404).json({ msg: 'Contact not found' });
        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        yield Contact_1.default.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Contact removed' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.deleteContact = deleteContact;
