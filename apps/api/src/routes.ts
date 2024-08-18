import { Router } from 'express';
import { Request, Response } from 'express';
import { authController } from './controllers/authController';
import { statisticsController } from './controllers/statisticsController';
import { jwtVerify } from "jose";
import { TextEncoder } from 'util';
import { miningHardwareController } from './controllers/miningHardwareController';
import { analysisController } from './controllers/analysisController';
require('dotenv').config();

const routes = Router();

// TODO: Move this to a shared package between apps/api and apps/web
export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY || "secret";
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

async function verifyAuth(request: Request, response: Response, next: any) {
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
        const { payload } = await jwtVerify(token, getJwtSecretKey());
        request.body.userId = payload.id;
        next()
    } catch (error) {
        return response.status(401).json({
            message: 'Invalid token',
        });
    }

}
        

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});

// Authentication routes
routes.post('/login', authController.login);
routes.post('/register', authController.register);

// Routes that require authentication

// Stats
routes.get('/mining-stats', verifyAuth, statisticsController.getMiningStats)
routes.get('/general/available-algorithms', verifyAuth, statisticsController.getAvailableAlogrithms)

// mining hardware crud
routes.get('/mining-hardware', verifyAuth, miningHardwareController.read);
routes.post('/mining-hardware', verifyAuth, miningHardwareController.create);
routes.put('/mining-hardware/:id', verifyAuth, miningHardwareController.update);
routes.delete('/mining-hardware/:id', verifyAuth, miningHardwareController.delete);

routes.get('/mining-hardware/all', verifyAuth, miningHardwareController.getAllMiningHardware);

// mining hardware crud

// Analysis
routes.get('/analysis', verifyAuth, analysisController.getAnalaysisForHardware);

// Routes that require authentication



export default routes;
