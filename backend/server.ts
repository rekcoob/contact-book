import express, { Express } from 'express';
import connectDB from './config/db';
// import mongoose from 'mongoose';
import path from 'path';

import usersRoutes from './routes/userRoutes';
// import authRoutes from './routes/auth';
import contactRoutes from './routes/contactRoutes';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Init Middleware
app.use(express.json());

// Connect Database
connectDB();

// Define Routes
// app.get('/', (req, res) => res.json({ msg: 'Welcome to the show' }));
app.use('/api/users', usersRoutes);
// app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   );
// }
// Set static folder
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'))
);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
