import { Router } from 'express';
import {
	getContacts,
	addContact,
	updateContact,
	deleteContact,
} from '../controllers/contactController';
import { requireAuth } from '../middleware/authMiddleware';
import { contactValidation } from '../validators/contactValidator';

const router: Router = Router();

// @ts-ignore
router.get('/', requireAuth, getContacts);
// @ts-ignore
router.post('/add-contact', [requireAuth, contactValidation], addContact);
// @ts-ignore
router.put('/edit-contact/:id', requireAuth, updateContact);
// @ts-ignore
router.delete('/delete-contact/:id', requireAuth, deleteContact);

export default router;
