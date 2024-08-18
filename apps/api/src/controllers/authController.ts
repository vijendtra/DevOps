import { User } from '../models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config();
export const authController = {
    login: async (request: Request, response: Response) => {
        
        const { email, password } = request.body;

        const missingFields = [];

        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');

        if (missingFields.length > 0) {
            return response.status(400).json({
                message: 'Missing fields',
                missingFields,
            });
        }

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return response.status(404).json({
                message: 'User not found',
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return response.status(401).json({
                message: 'Invalid password',
            });
        }

        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.SECRET || 'secret', {
            expiresIn: '1w',
        });

        return response.status(200).json({
            token,
        });
    },

    register: async (request: Request, response: Response) => {

        const { name, email, password, phone } = request.body;

        const missingFields = [];

        if (!name) missingFields.push('name');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!phone) missingFields.push('phone');

        if (missingFields.length > 0) {
            return response.status(400).json({
                message: 'Missing fields',
                missingFields,
            });
        }

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (user) {
            return response.status(409).json({
                message: 'User already exists',
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
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

        let token = jwt.sign({id: newUser.id, email: newUser.email, name: newUser.name}, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1w',
        });

        return response.status(201).json({
            token,
        });

    },

}
