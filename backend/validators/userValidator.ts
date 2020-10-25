import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const registerValidation = [
	check('name', 'Please add name').not().isEmpty(),
	check('email', 'Please include a valid email').isEmail(),
	check(
		'password',
		'Please enter a password with 6 or more characters'
	).isLength({ min: 6 }),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });
		next();
	},
];

export const loginValidation = [
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Password is required').exists(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });
		next();
	},
];
