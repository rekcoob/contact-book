import { Document } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	// optional?
	// createdAt: Date;
}

export interface IUserRequest extends Request {
	user: IUser;
}
