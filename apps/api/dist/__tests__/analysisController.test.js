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
const supertest_1 = __importDefault(require("supertest"));
const analysisController_1 = require("../controllers/analysisController");
const MiningHardware_1 = require("../models/MiningHardware");
const server_1 = __importDefault(require("../server"));
require('dotenv').config();
let token = process.env.TEST_AUTH_TOKEN;
describe('Analysis Controller', () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.resetAllMocks();
    }));
    describe('given no auth token', () => {
        it('should not return a analysis of hardware', () => __awaiter(void 0, void 0, void 0, function* () {
            const miningHardware = [
                {
                    id: 1,
                    name: 'Antminer S1',
                    location: 'Mining Facility A',
                    hashRate: '95.47337585632621 TH/S'
                },
            ];
            jest.spyOn(MiningHardware_1.MiningHardware, 'findOne').mockResolvedValueOnce(miningHardware);
            yield (0, supertest_1.default)(server_1.default).get(`/api/v1/analysis?hardwareId=1&days=10`).expect(401);
        }));
    });
    describe('given an auth token', () => {
        it('should return a analysis of hardware that matches the correct calculations', () => __awaiter(void 0, void 0, void 0, function* () {
            const miningHardware = {
                id: 1,
                name: 'Antminer S1',
                location: 'Mining Facility A',
                hashRate: '95.47337585632621 TH/S'
            };
            jest.spyOn(MiningHardware_1.MiningHardware, 'findOne').mockResolvedValueOnce(miningHardware);
            const hashRate = parseFloat(miningHardware.hashRate.replace('TH/S', ''));
            const days = 10;
            const expectedBitcoins = (0, analysisController_1.calculateExpectedBitcoins)(days, 7);
            const totalHashes = (0, analysisController_1.calculateHashesCompleted)(hashRate, days);
            const yieldPercentage = (0, analysisController_1.calculateYieldPercentage)(1, expectedBitcoins);
            const averageHashRate = (0, analysisController_1.calculateAverageHashRate)(totalHashes, days);
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/v1/analysis?hardwareId=${1}&days=${10}`).set('Authorization', `Bearer ${token}`).expect(200);
            expect(response.body).toEqual({
                expectedBitcoins,
                totalHashes,
                yieldPercentage,
                averageHashRate
            });
        }));
    });
});
