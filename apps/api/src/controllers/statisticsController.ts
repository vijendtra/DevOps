import { Request, Response } from 'express';
require('dotenv').config();
import axios from 'axios';

export const statisticsController = {
    getMiningStats: async (request: Request, response: Response) => {
        
        const btcPriceURL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad'
        const difficultyQURL = 'https://blockchain.info/q/getdifficulty'

        try {
            const btcPriceResponse = await axios.get(btcPriceURL);
            const btcPrice = btcPriceResponse.data.bitcoin.cad;

            const difficultyResponse = await axios.get(difficultyQURL);

            return response.json({
                miningStats: {
                    totalHashrate: 1245.4265974589805,
                    activeMiners: 46,
                    miningRevenue: 8930.862364781207,
                },
                btcPrice,
                difficulty: difficultyResponse.data,
            });
        } catch (error) {
            // console.log(error);
            return response.json({
                totalHashrate: 1245.4265974589805,
                activeMiners: 46,
                miningRevenue: 8930.862364781207,
                btcPrice: 0
            });
        }

    },

    getAvailableAlogrithms: async (request: Request, response: Response) => {
        const url = 'https://api2.nicehash.com/main/api/v2/mining/algorithms'

        try {
            const nicehashResponse = await axios.get(url);
            return response.json(nicehashResponse.data);
        } catch (error) {
            // console.log(error);
            return response.json([]);
        } 
    }
}
