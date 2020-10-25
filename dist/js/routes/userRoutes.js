"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const userValidator_1 = require("../validators/userValidator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.Router();
router.get('/register', (req, res) => res.json({ msg: 'Register' }));
router.route('/register').post(userValidator_1.registerValidation, userController_1.default.registerUser);
router.route('/login').post(userValidator_1.loginValidation, userController_1.default.loginUser);
// @ts-ignore
router.get('/login', authMiddleware_1.requireAuth, userController_1.default.checkUser);
exports.default = router;
