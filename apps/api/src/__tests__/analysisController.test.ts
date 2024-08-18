import supertest from "supertest";
import { calculateAverageHashRate, calculateExpectedBitcoins, calculateHashesCompleted, calculateYieldPercentage } from "../controllers/analysisController";
import { MiningHardware } from "../models/MiningHardware";
import server from "../server";
require('dotenv').config();

let token = process.env.TEST_AUTH_TOKEN;

describe('Analysis Controller', () => {

    afterAll(async () => {
        jest.resetAllMocks();
    });

    describe('given no auth token', () => {
        it('should not return a analysis of hardware', async () => {
            const miningHardware = [
                {
                    id: 1,
                    name: 'Antminer S1',
                    location: 'Mining Facility A',
                    hashRate: '95.47337585632621 TH/S'
                },
            ]

            jest.spyOn(MiningHardware, 'findOne').mockResolvedValueOnce(miningHardware as any);

            await supertest(server).get(`/api/v1/analysis?hardwareId=1&days=10`).expect(401);

        });
    }); 

    describe('given an auth token', () => {

        it('should return a analysis of hardware that matches the correct calculations', async () => {
            
            const miningHardware = {
                id: 1,
                name: 'Antminer S1',
                location: 'Mining Facility A',
                hashRate: '95.47337585632621 TH/S'
            };

            jest.spyOn(MiningHardware, 'findOne').mockResolvedValueOnce(miningHardware as MiningHardware)

            const hashRate = parseFloat(miningHardware.hashRate.replace('TH/S', ''));
            const days = 10;

            const expectedBitcoins = calculateExpectedBitcoins(days, 7);
            const totalHashes = calculateHashesCompleted(hashRate, days as unknown as number);

            const yieldPercentage = calculateYieldPercentage(1, expectedBitcoins);
            const averageHashRate = calculateAverageHashRate(totalHashes, days as unknown as number);

            const response = await supertest(server).get(`/api/v1/analysis?hardwareId=${1}&days=${10}`).set('Authorization', `Bearer ${token}`).expect(200);

            expect(response.body).toEqual({
                expectedBitcoins,
                totalHashes,
                yieldPercentage,
                averageHashRate
            });
        });

    });

});
