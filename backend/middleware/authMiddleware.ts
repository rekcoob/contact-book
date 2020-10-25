import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUser } from '../types/user';

interface IUserRequest extends Request {
	user: IUser;
}

// interface IDecoded {
// 	user: IUser;
// }

export const requireAuth = (
	req: IUserRequest,
	res: Response,
	next: NextFunction
) => {
	// Get token from header
	const token = req.header('x-auth-token');
	// Check if not token
	if (!token) {
		// 401 unauthorized
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		const decoded: any = jwt.verify(token, 'secret');
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};

// check current user
export const checkUser = async (req: IUserRequest, res: Response) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

// export { requireAuth, checkUser };
