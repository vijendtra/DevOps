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
const axios_1 = __importDefault(require("axios"));
const statisticsController_1 = require("../controllers/statisticsController");
jest.mock('axios'); // Mock the axios library
describe('Statistics Controller', () => {
    afterEach(() => {
        jest.resetAllMocks(); // Reset all axios mocks after each test
    });
    it('getMiningStats should return mining stats', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock Axios response for btcPriceURL
        const btcPriceResponse = {
            data: { bitcoin: { cad: 12345.67 } },
        };
        const maxiosget = jest.spyOn(axios_1.default, 'get');
        maxiosget.mockResolvedValueOnce(btcPriceResponse);
        // Mock Axios response for difficultyQURL
        const difficultyResponse = {
            data: 12345678,
        };
        maxiosget.mockResolvedValueOnce(difficultyResponse);
        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };
        yield statisticsController_1.statisticsController.getMiningStats(mockRequest, mockResponse);
        // Assertions
        expect(mockResponse.json).toHaveBeenCalledWith({
            miningStats: {
                totalHashrate: 1245.4265974589805,
                activeMiners: 46,
                miningRevenue: 8930.862364781207,
            },
            btcPrice: 12345.67,
            difficulty: 12345678,
        });
    }));
    it('getMiningStats should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock Axios error
        // axios.get.mockRejectedValueOnce(new Error('An error occurred'));
        const maxiosget = jest.spyOn(axios_1.default, 'get');
        maxiosget.mockRejectedValueOnce(new Error('An error occurred'));
        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };
        yield statisticsController_1.statisticsController.getMiningStats(mockRequest, mockResponse);
        // Assertions for error case
        expect(mockResponse.json).toHaveBeenCalledWith({
            totalHashrate: 1245.4265974589805,
            activeMiners: 46,
            miningRevenue: 8930.862364781207,
            btcPrice: 0,
        });
    }));
    it('getAvailableAlogrithms should return available algorithms', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock Axios response for getAvailableAlogrithms
        const algorithmsResponse = { data: ['algo1', 'algo2'] };
        // axios.get.mockResolvedValueOnce(algorithmsResponse);
        const maxiosget = jest.spyOn(axios_1.default, 'get');
        maxiosget.mockResolvedValueOnce(algorithmsResponse);
        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };
        yield statisticsController_1.statisticsController.getAvailableAlogrithms(mockRequest, mockResponse);
        // Assertions
        expect(mockResponse.json).toHaveBeenCalledWith(['algo1', 'algo2']);
    }));
    it('getAvailableAlogrithms should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock Axios error
        // axios.get.mockRejectedValueOnce(new Error('An error occurred'));
        const maxiosget = jest.spyOn(axios_1.default, 'get');
        maxiosget.mockRejectedValueOnce(new Error('An error occurred'));
        const mockRequest = {};
        const mockResponse = {
            json: jest.fn(),
        };
        yield statisticsController_1.statisticsController.getAvailableAlogrithms(mockRequest, mockResponse);
        // Assertions for error case
        expect(mockResponse.json).toHaveBeenCalledWith([]);
    }));
});
