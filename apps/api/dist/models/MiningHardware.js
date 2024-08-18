"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMiningHardware = exports.MiningHardware = void 0;
const sequelize_1 = require("sequelize");
class MiningHardware extends sequelize_1.Model {
}
exports.MiningHardware = MiningHardware;
function initMiningHardware(sequelize) {
    MiningHardware.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        location: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        hashRate: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'mining_hardware',
        timestamps: false,
    });
}
exports.initMiningHardware = initMiningHardware;
