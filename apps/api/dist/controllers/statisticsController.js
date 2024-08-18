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
exports.statisticsController = void 0;
require('dotenv').config();
const axios_1 = __importDefault(require("axios"));
exports.statisticsController = {
    getMiningStats: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const btcPriceURL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad';
        const difficultyQURL = 'https://blockchain.info/q/getdifficulty';
        try {
            const btcPriceResponse = yield axios_1.default.get(btcPriceURL);
            const btcPrice = btcPriceResponse.data.bitcoin.cad;
            const difficultyResponse = yield axios_1.default.get(difficultyQURL);
            return response.json({
                miningStats: {
                    totalHashrate: 1245.4265974589805,
                    activeMiners: 46,
                    miningRevenue: 8930.862364781207,
                },
                btcPrice,
                difficulty: difficultyResponse.data,
            });
        }
        catch (error) {
            // console.log(error);
            return response.json({
                totalHashrate: 1245.4265974589805,
                activeMiners: 46,
                miningRevenue: 8930.862364781207,
                btcPrice: 0
            });
        }
    }),
    getAvailableAlogrithms: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const url = 'https://api2.nicehash.com/main/api/v2/mining/algorithms';
        try {
            const nicehashResponse = yield axios_1.default.get(url);
            return response.json(nicehashResponse.data);
        }
        catch (error) {
            // console.log(error);
            return response.json([]);
        }
    })
};
