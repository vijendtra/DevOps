import { Sequelize, Model } from 'sequelize';
export declare class MiningHardware extends Model {
    id: number;
    name: string;
    location: string;
    hashRate: string;
}
export declare function initMiningHardware(sequelize: Sequelize): void;
//# sourceMappingURL=MiningHardware.d.ts.map