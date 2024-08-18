import { Request, Response } from 'express';
import { MiningHardware } from '../models/MiningHardware';


const expectedBitcoinsEvery10ExaHash = 7;
const actualMinedBitcoins = 1;

export const calculateExpectedBitcoins = (days: number, expectedBitcoinsEvery10ExaHash: number) => {
    return (days / 10) * expectedBitcoinsEvery10ExaHash;
}

export const calculateHashesCompleted = (hashRateTHs: number, days: number) => {
    return hashRateTHs * days * 24 * 60 * 60;
}

export const calculateYieldPercentage = (actualMinedBitcoins: number, expectedBitcoins: number) => {
    return (actualMinedBitcoins / expectedBitcoins) * 100;
}

export const calculateAverageHashRate = (totalHashes: number, days: number) => {
    return totalHashes / (days * 24 * 60 * 60);
}


export const analysisController = {
    getAnalaysisForHardware: async (request: Request, response: Response) => {
        const { hardwareId, days } = request.query;

        let hardware = await MiningHardware.findOne({
            where: {
                id: hardwareId
            },
            limit: 1
        })

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

        const totalHashes = calculateHashesCompleted(hashRateTHs, days as unknown as number);
        const expectedBitcoins = calculateExpectedBitcoins(days as unknown as number, expectedBitcoinsEvery10ExaHash);
        const yieldPercentage = calculateYieldPercentage(actualMinedBitcoins, expectedBitcoins);
        const averageHashRate = calculateAverageHashRate(totalHashes, days as unknown as number);



        return response.json({
            expectedBitcoins,
            totalHashes,
            yieldPercentage,
            averageHashRate
        });
    }

}
