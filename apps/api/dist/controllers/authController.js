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
exports.authController = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
exports.authController = {
    login: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = request.body;
        const missingFields = [];
        if (!email)
            missingFields.push('email');
        if (!password)
            missingFields.push('password');
        if (missingFields.length > 0) {
            return response.status(400).json({
                message: 'Missing fields',
                missingFields,
            });
        }
        const user = yield User_1.User.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            return response.status(404).json({
                message: 'User not found',
            });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return response.status(401).json({
                message: 'Invalid password',
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.SECRET || 'secret', {
            expiresIn: '1w',
        });
        return response.status(200).json({
            token,
        });
    }),
    register: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password, phone } = request.body;
        const missingFields = [];
        if (!name)
            missingFields.push('name');
        if (!email)
            missingFields.push('email');
        if (!password)
            missingFields.push('password');
        if (!phone)
            missingFields.push('phone');
        if (missingFields.length > 0) {
            return response.status(400).json({
                message: 'Missing fields',
                missingFields,
            });
        }
        const user = yield User_1.User.findOne({
            where: {
                email,
            },
        });
        if (user) {
            return response.status(409).json({
                message: 'User already exists',
            });
        }
        const hash = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield User_1.User.create({
            name,
            email,
            password: hash,
            phone,
            active: true,
        });
        if (!newUser) {
            return response.status(400).json({
                message: 'Error creating user',
            });
        }
        let token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1w',
        });
        return response.status(201).json({
            token,
        });
    }),
};
