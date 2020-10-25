"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const contactValidator_1 = require("../validators/contactValidator");
const router = express_1.Router();
// @ts-ignore
router.get('/', authMiddleware_1.requireAuth, contactController_1.getContacts);
// @ts-ignore
router.post('/add-contact', [authMiddleware_1.requireAuth, contactValidator_1.contactValidation], contactController_1.addContact);
// @ts-ignore
router.put('/edit-contact/:id', authMiddleware_1.requireAuth, contactController_1.updateContact);
// @ts-ignore
router.delete('/delete-contact/:id', authMiddleware_1.requireAuth, contactController_1.deleteContact);
exports.default = router;
