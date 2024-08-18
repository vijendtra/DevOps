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
exports.analysisController = exports.calculateAverageHashRate = exports.calculateYieldPercentage = exports.calculateHashesCompleted = exports.calculateExpectedBitcoins = void 0;
const MiningHardware_1 = require("../models/MiningHardware");
const expectedBitcoinsEvery10ExaHash = 7;
const actualMinedBitcoins = 1;
const calculateExpectedBitcoins = (days, expectedBitcoinsEvery10ExaHash) => {
    return (days / 10) * expectedBitcoinsEvery10ExaHash;
};
exports.calculateExpectedBitcoins = calculateExpectedBitcoins;
const calculateHashesCompleted = (hashRateTHs, days) => {
    return hashRateTHs * days * 24 * 60 * 60;
};
exports.calculateHashesCompleted = calculateHashesCompleted;
const calculateYieldPercentage = (actualMinedBitcoins, expectedBitcoins) => {
    return (actualMinedBitcoins / expectedBitcoins) * 100;
};
exports.calculateYieldPercentage = calculateYieldPercentage;
const calculateAverageHashRate = (totalHashes, days) => {
    return totalHashes / (days * 24 * 60 * 60);
};
exports.calculateAverageHashRate = calculateAverageHashRate;
exports.analysisController = {
    getAnalaysisForHardware: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const { hardwareId, days } = request.query;
        let hardware = yield MiningHardware_1.MiningHardware.findOne({
            where: {
                id: hardwareId
            },
            limit: 1
        });
        // if hardware is array, return the first element
        if (Array.isArray(hardware)) {
            hardware = hardware[0];
        }
        if (!hardware) {
            return response.status(404).json({
                message: 'Hardware not found'
            });
        }
        // remove TH/s from the end of the string of hardware.hashRate if it has it
        const hashRateTHs = parseFloat(hardware.hashRate.replace('TH/s', ''));
        // - During a 10 day period how many hashes does an Antminer S1 expect to   complete?
        // - We would expect to mine 7 bitcoin every 10 ExaHash. How many bitcoin does an Antminer S1 expect to win over 10 days?
        // - Our Antminer S1 really won 1 bitcoin over a 10 day period. What percent of expected yield did it achieve? What would we expect the miners average hashrate to have been over the period?
        const totalHashes = (0, exports.calculateHashesCompleted)(hashRateTHs, days);
        const expectedBitcoins = (0, exports.calculateExpectedBitcoins)(days, expectedBitcoinsEvery10ExaHash);
        const yieldPercentage = (0, exports.calculateYieldPercentage)(actualMinedBitcoins, expectedBitcoins);
        const averageHashRate = (0, exports.calculateAverageHashRate)(totalHashes, days);
        return response.json({
            expectedBitcoins,
            totalHashes,
            yieldPercentage,
            averageHashRate
        });
    })
};
