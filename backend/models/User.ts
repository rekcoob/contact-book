import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/user';

interface IUserModel extends IUser {
	matchPassword: any;
	comparePassword: any;
}

const userSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// fire a function before doc saved to db
userSchema.pre<any>('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// compare passwords function
userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.statics.comparePasswords = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// static method to login user
userSchema.statics.login = async function (email: string, password: string) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error('incorrect password');
	}
	throw Error('incorrect email');
};

export default model<IUser>('User', userSchema);
