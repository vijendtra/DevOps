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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtSecretKey = void 0;
const express_1 = require("express");
const authController_1 = require("./controllers/authController");
const statisticsController_1 = require("./controllers/statisticsController");
const jose_1 = require("jose");
const util_1 = require("util");
const miningHardwareController_1 = require("./controllers/miningHardwareController");
const analysisController_1 = require("./controllers/analysisController");
require('dotenv').config();
const routes = (0, express_1.Router)();
// TODO: Move this to a shared package between apps/api and apps/web
function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET_KEY || "secret";
    if (!secret) {
        throw new Error("JWT Secret key is not matched");
    }
    return new util_1.TextEncoder().encode(secret);
}
exports.getJwtSecretKey = getJwtSecretKey;
function verifyAuth(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).json({
                message: 'No token provided',
            });
        }
        const parts = authHeader.split(' ');
        if (parts.length !== 2) {
            return response.status(401).json({
                message: 'Token error',
            });
        }
        const [scheme, token] = parts;
        if (!/^Bearer$/i.test(scheme)) {
            return response.status(401).json({
                message: 'Token malformatted',
            });
        }
        try {
            // if token equals to 'secret' then it's a test token
            if (token === process.env.TEST_AUTH_TOKEN) {
                request.body.userId = 1;
                return next();
            }
            const { payload } = yield (0, jose_1.jwtVerify)(token, getJwtSecretKey());
            request.body.userId = payload.id;
            next();
        }
        catch (error) {
            return response.status(401).json({
                message: 'Invalid token',
            });
        }
    });
}
routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});
// Authentication routes
routes.post('/login', authController_1.authController.login);
routes.post('/register', authController_1.authController.register);
// Routes that require authentication
// Stats
routes.get('/mining-stats', verifyAuth, statisticsController_1.statisticsController.getMiningStats);
routes.get('/general/available-algorithms', verifyAuth, statisticsController_1.statisticsController.getAvailableAlogrithms);
// mining hardware crud
routes.get('/mining-hardware', verifyAuth, miningHardwareController_1.miningHardwareController.read);
routes.post('/mining-hardware', verifyAuth, miningHardwareController_1.miningHardwareController.create);
routes.put('/mining-hardware/:id', verifyAuth, miningHardwareController_1.miningHardwareController.update);
routes.delete('/mining-hardware/:id', verifyAuth, miningHardwareController_1.miningHardwareController.delete);
routes.get('/mining-hardware/all', verifyAuth, miningHardwareController_1.miningHardwareController.getAllMiningHardware);
// mining hardware crud
// Analysis
routes.get('/analysis', verifyAuth, analysisController_1.analysisController.getAnalaysisForHardware);
// Routes that require authentication
exports.default = routes;
