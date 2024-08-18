export type DTColumn = {
    key: string;
    label: string;
};

export type Hardware = {
    id: string;
    name: string;
    hashRate: number;
};

export type AnalyzedHardwareData = {
    totalHashes: number;
    expectedBitcoins: number;
    yieldPercentage: number;
    averageHashRate: number;
}
