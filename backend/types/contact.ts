import { Document } from 'mongoose';

export interface IContact extends Document {
	user: string;
	name: string;
	email: string;
	phone?: string;
	type?: string;
	// optional?
	// createdAt: Date;
}

export interface IContactRequest extends Request {
	contact: IContact;
}
