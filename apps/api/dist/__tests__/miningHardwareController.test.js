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
const MiningHardware_1 = require("../models/MiningHardware");
const server_1 = __importDefault(require("../server"));
require('dotenv').config();
let token = process.env.TEST_AUTH_TOKEN;
describe('Mining Hardware Controller', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        jest.resetAllMocks();
    }));
    describe('given no auth token', () => {
        it('should not return a list of mining hardware', () => __awaiter(void 0, void 0, void 0, function* () {
            const page = 1;
            yield (0, supertest_1.default)(server_1.default).get(`/api/v1/mining-hardware?page=${page}`).expect(401);
        }));
    });
    describe('given the page number', () => {
        it('should return a list of mining hardware', () => __awaiter(void 0, void 0, void 0, function* () {
            const page = 1;
            // mock the model and return a list of mining hardware
            const miningHardware = [
                {
                    id: 1,
                    name: 'Antminer S9',
                    location: 'USA',
                    hashRate: '13.5 TH/s',
                },
            ];
            jest.spyOn(MiningHardware_1.MiningHardware, 'findAll').mockResolvedValueOnce(miningHardware);
            jest.spyOn(MiningHardware_1.MiningHardware, 'count').mockResolvedValueOnce(1);
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/v1/mining-hardware?page=${page}`).set('Authorization', `Bearer ${token}`).expect(200);
            expect(response.body).toEqual({
                currentPage: 1,
                rows: [
                    {
                        id: 1,
                        name: 'Antminer S9',
                        location: 'USA',
                        hashRate: '13.5 TH/s',
                    },
                ],
                totalPages: 1,
            });
        }));
    });
    describe('given the mining hardware body data', () => {
        it('should create a new mining hardware', () => __awaiter(void 0, void 0, void 0, function* () {
            const miningHardware = {
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            };
            jest.spyOn(MiningHardware_1.MiningHardware, 'create').mockResolvedValueOnce(miningHardware);
            const response = yield (0, supertest_1.default)(server_1.default).post(`/api/v1/mining-hardware`).set('Authorization', `Bearer ${token}`).send(miningHardware).expect(201);
            expect(response.body).toEqual({
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            });
        }));
    });
    describe('given the mining hardware body data and id in route', () => {
        it('should update a mining hardware', () => __awaiter(void 0, void 0, void 0, function* () {
            const miningHardware = {
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            };
            jest.spyOn(MiningHardware_1.MiningHardware, 'update').mockResolvedValueOnce(miningHardware);
            const response = yield (0, supertest_1.default)(server_1.default).put(`/api/v1/mining-hardware/1`).set('Authorization', `Bearer ${token}`).send(miningHardware).expect(200);
            expect(response.body).toEqual({
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            });
        }));
    });
    describe('given the mining hardware id in route and delete method', () => {
        it('should delete a mining hardware', () => __awaiter(void 0, void 0, void 0, function* () {
            const miningHardware = {
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            };
            jest.spyOn(MiningHardware_1.MiningHardware, 'destroy').mockResolvedValueOnce(miningHardware);
            const response = yield (0, supertest_1.default)(server_1.default).delete(`/api/v1/mining-hardware/1`).set('Authorization', `Bearer ${token}`).expect(200);
            expect(response.body).toEqual({
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            });
        }));
    });
});
