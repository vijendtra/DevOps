"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
// import sequelize
const sequelize_1 = require("sequelize");
// import models
const User_1 = require("./models/User");
const MiningHardware_1 = require("./models/MiningHardware");
const routes_1 = __importDefault(require("./routes"));
const logger_1 = require("logger");
class Server {
    constructor() {
        this.db_name = process.env.POSTGRES_DB || 'dmg';
        this.db_user = process.env.POSTGRES_USER || 'postgres';
        this.db_pass = process.env.POSTGRES_PASSWORD || 'postgres';
        this.db_host = process.env.DB_HOST || 'db';
        this.db_port = Number(process.env.DB_PORT) || 5432;
        this.server = (0, express_1.default)();
        this.middlewares();
        this.server.use((0, cors_1.default)({
            origin: '*',
        }));
        this.routes();
        this.database();
        this.initModels(this.sequelize);
        this.initTables();
    }
    middlewares() {
        this.server.use(express_1.default.json());
    }
    routes() {
        this.server.use('/api/v1', routes_1.default);
    }
    database() {
        const sequelize = new sequelize_1.Sequelize(this.db_name, this.db_user, this.db_pass, {
            host: this.db_host,
            port: this.db_port,
            dialect: 'postgres',
            logging: false,
        });
        sequelize.authenticate().then(() => {
            (0, logger_1.log)('Connection has been established successfully.');
        }).catch((error) => {
            (0, logger_1.log)(`credentials: ${this.db_user}:${this.db_pass}@${this.db_host}:${this.db_port}/${this.db_name}`);
            (0, logger_1.log)('Unable to connect to the database:' + error);
        });
        this.sequelize = sequelize;
    }
    initModels(sequelize) {
        const models = {
            User: (0, User_1.initUser)(sequelize),
            MiningHardware: (0, MiningHardware_1.initMiningHardware)(sequelize),
        };
        return models;
    }
    initTables() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sequelize.sync();
            // if Antminer S1 is not in the database, then seed the database
            const miningHardware = yield MiningHardware_1.MiningHardware.findOne({
                where: {
                    name: "Antminer S1"
                }
            });
            if (!miningHardware) {
                yield MiningHardware_1.MiningHardware.bulkCreate([
                    {
                        name: "Antminer S1",
                        location: "Mining Facility C",
                        hashRate: "95.47337585632621"
                    },
                    {
                        name: "Antminer S2",
                        location: "Mining Facility A",
                        hashRate: "63.124653604061336"
                    },
                    {
                        name: "Antminer S3",
                        location: "Mining Facility B",
                        hashRate: "150.0160810465253"
                    },
                    {
                        name: "Antminer S4",
                        location: "Mining Facility C",
                        hashRate: "129.9991929861352"
                    },
                    {
                        name: "Antminer S5",
                        location: "Mining Facility C",
                        hashRate: "89.89673834028852"
                    },
                    {
                        name: "Antminer S6",
                        location: "Mining Facility A",
                        hashRate: "119.75219585930984"
                    },
                    {
                        name: "Antminer S7",
                        location: "Mining Facility C",
                        hashRate: "177.73249985564564"
                    },
                    {
                        name: "Antminer S8",
                        location: "Mining Facility B",
                        hashRate: "171.52280818167156"
                    },
                    {
                        name: "Antminer S9",
                        location: "Mining Facility A",
                        hashRate: "74.60731729087343"
                    },
                    {
                        name: "Antminer S10",
                        location: "Mining Facility B",
                        hashRate: "180.02524149781846"
                    },
                    {
                        name: "Antminer S11",
                        location: "Mining Facility A",
                        hashRate: "199.45025081508592"
                    }
                ]);
                (0, logger_1.log)('Database seeded');
            }
        });
    }
}
exports.default = new Server().server;
