import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const contactValidation = [
	check('name', 'Name is required').not().isEmpty(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });
		next();
	},
];
