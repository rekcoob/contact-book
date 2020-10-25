"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const createToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, 'secret', {
        expiresIn: 360000,
    });
};
// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        return res.status(400).json({ msg: 'That email is already taken' });
    }
    try {
        const user = yield User_1.default.create({ name, email, password });
        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = createToken(payload);
        res.status(201).json({ token: token });
    }
    catch (err) {
        res.status(500).send('Server Error');
    }
});
// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
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
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route     GET api/users/login
// @desc      Get logged in user
// @access    Private
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.default = { registerUser, loginUser, checkUser };
