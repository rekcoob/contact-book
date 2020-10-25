import mongoose from 'mongoose';
// import config from 'config';

// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.mz0or.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const uri: string =
	'mongodb+srv://test:test@cluster0.mz0or.mongodb.net/cluster0?retryWrites=true&w=majority';

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
};
mongoose.set('useFindAndModify', false);

const connectDB = async () => {
	try {
		await mongoose.connect(uri, options);
		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

export default connectDB;
