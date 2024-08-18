import { Request, Response } from 'express';
export declare const calculateExpectedBitcoins: (days: number, expectedBitcoinsEvery10ExaHash: number) => number;
export declare const calculateHashesCompleted: (hashRateTHs: number, days: number) => number;
export declare const calculateYieldPercentage: (actualMinedBitcoins: number, expectedBitcoins: number) => number;
export declare const calculateAverageHashRate: (totalHashes: number, days: number) => number;
export declare const analysisController: {
    getAnalaysisForHardware: (request: Request, response: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=analysisController.d.ts.map