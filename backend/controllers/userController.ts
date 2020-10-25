import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { IUser, IUserRequest } from '../types/user';

// Create Json Web Token
interface IPayload {
	user: {
		id: number;
	};
}
const createToken = (payload: IPayload) => {
	return jwt.sign(payload, 'secret', {
		expiresIn: 360000,
	});
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		return res.status(400).json({ msg: 'That email is already taken' });
	}

	try {
		const user = await User.create({ name, email, password });
		const payload = {
			user: {
				id: user.id,
			},
		};
		const token = createToken(payload);
		res.status(201).json({ token: token });
	} catch (err) {
		res.status(500).send('Server Error');
	}
};

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ msg: 'Invalid Credentials' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ msg: 'Invalid Credentials' });
		}
		const payload = {
			user: {
				id: user.id,
			},
		};
		const token = createToken(payload);
		res.status(200).json({ token });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

// @route     GET api/users/login
// @desc      Get logged in user
// @access    Private
const checkUser = async (req: IUserRequest, res: Response) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

export default { registerUser, loginUser, checkUser };
