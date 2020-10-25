import { model, Schema } from 'mongoose';
import { IContact } from '../types/contact';

const contactSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	type: {
		type: String,
		default: 'personal',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

export default model<IContact>('Contact', contactSchema);
