import { Sequelize, Model, DataTypes } from 'sequelize';

export class User extends Model {
    declare public id: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public active!: boolean;
}

export const initUser = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'user',
    });
};
