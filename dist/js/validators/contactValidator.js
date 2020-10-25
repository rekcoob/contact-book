"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactValidation = void 0;
const express_validator_1 = require("express-validator");
exports.contactValidation = [
    express_validator_1.check('name', 'Name is required').not().isEmpty(),
    (req, res, next) => {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
];
