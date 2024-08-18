import { Sequelize, Model, DataTypes } from 'sequelize';

export class MiningHardware extends Model {
    public id!: number;
    public name!: string;
    public location!: string;
    public hashRate!: string;
}

export function initMiningHardware(sequelize: Sequelize) {
    MiningHardware.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            hashRate: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'mining_hardware',
            timestamps: false,
        },
    );
}
