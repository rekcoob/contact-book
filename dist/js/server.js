"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
// import mongoose from 'mongoose';
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// import authRoutes from './routes/auth';
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const app = express_1.default();
const PORT = process.env.PORT || 5000;
// Init Middleware
app.use(express_1.default.json());
// Connect Database
db_1.default();
// Define Routes
app.get('/', (req, res) => res.json({ msg: 'Welcome to the show' }));
app.use('/api/users', userRoutes_1.default);
// app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes_1.default);
// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   );
// }
// Set static folder
app.use(express_1.default.static(path_1.default.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, 'frontend/build', 'index.html')));
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
