"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUser = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
const initUser = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        active: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'user',
    });
};
exports.initUser = initUser;
