import supertest from "supertest";
import { MiningHardware } from "../models/MiningHardware";
import server from "../server";
require('dotenv').config();

let token = process.env.TEST_AUTH_TOKEN;

describe('Mining Hardware Controller', () => {

    beforeAll(async () => {
    });

    afterAll(async () => {
        jest.resetAllMocks();
    });

    describe('given no auth token', () => {
        it('should not return a list of mining hardware', async () => {
            const page = 1;
            await supertest(server).get(`/api/v1/mining-hardware?page=${page}`).expect(401);
        });
    }); 

    describe('given the page number', () => {
        it('should return a list of mining hardware', async () => {
            const page = 1;

            // mock the model and return a list of mining hardware
            const miningHardware = [
                {
                    id: 1,
                    name: 'Antminer S9',
                    location: 'USA',
                    hashRate: '13.5 TH/s',
                },
            ]

            jest.spyOn(MiningHardware, 'findAll').mockResolvedValueOnce(miningHardware as any);
            jest.spyOn(MiningHardware, 'count').mockResolvedValueOnce(1);

            const response = await supertest(server).get(`/api/v1/mining-hardware?page=${page}`).set('Authorization', `Bearer ${token}`).expect(200);

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

        });
    })

    describe('given the mining hardware body data', () => {

        it('should create a new mining hardware', async () => {

            const miningHardware = {
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            }

            jest.spyOn(MiningHardware, 'create').mockResolvedValueOnce(miningHardware as any);

            const response = await supertest(server).post(`/api/v1/mining-hardware`).set('Authorization', `Bearer ${token}`).send(miningHardware).expect(201);

            expect(response.body).toEqual({
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            });
        });
    });

    describe('given the mining hardware body data and id in route', () => {
        
        it('should update a mining hardware', async () => {

            const miningHardware = {
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            }

            jest.spyOn(MiningHardware, 'update').mockResolvedValueOnce(miningHardware as any);

            const response = await supertest(server).put(`/api/v1/mining-hardware/1`).set('Authorization', `Bearer ${token}`).send(miningHardware).expect(200);

            expect(response.body).toEqual({
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            });

        });

    });

    describe('given the mining hardware id in route and delete method', () => {
        
        it('should delete a mining hardware', async () => {

            const miningHardware = {
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            }

            jest.spyOn(MiningHardware, 'destroy').mockResolvedValueOnce(miningHardware as any);

            const response = await supertest(server).delete(`/api/v1/mining-hardware/1`).set('Authorization', `Bearer ${token}`).expect(200);

            expect(response.body).toEqual({
                name: 'Antminer S9',
                location: 'USA',
                hashRate: '13.5 TH/s',
            });

        });

    });

});
