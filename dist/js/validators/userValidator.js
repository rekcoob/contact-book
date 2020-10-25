"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    express_validator_1.check('name', 'Please add name').not().isEmpty(),
    express_validator_1.check('email', 'Please include a valid email').isEmail(),
    express_validator_1.check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    (req, res, next) => {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
];
exports.loginValidation = [
    express_validator_1.check('email', 'Please include a valid email').isEmail(),
    express_validator_1.check('password', 'Password is required').exists(),
    (req, res, next) => {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
];
