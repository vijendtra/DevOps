import express from 'express';
require('dotenv').config();
import cors from 'cors';

// import sequelize
import { Sequelize } from 'sequelize';
// import models
import { initUser } from './models/User'
import { initMiningHardware, MiningHardware } from './models/MiningHardware';

import routes from './routes';
import { log } from 'logger';

class Server {
    public server: express.Application;

    private db_name: string = process.env.POSTGRES_DB || 'dmg';
    private db_user: string = process.env.POSTGRES_USER || 'postgres';
    private db_pass: string = process.env.POSTGRES_PASSWORD || 'postgres';
    private db_host: string = process.env.DB_HOST || 'db';
    private db_port: number = Number(process.env.DB_PORT) || 5432;

    private sequelize!: Sequelize;

    constructor() {
        this.server = express();

        this.middlewares();

        this.server.use(cors(
            {
                origin: '*',
            }
        ));

        this.routes();

        this.database();
        
        this.initModels(this.sequelize);

        this.initTables();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use('/api/v1', routes);
    }

    database() {
        const sequelize = new Sequelize(
            this.db_name,
            this.db_user,
            this.db_pass,
            {
                host: this.db_host,
                port: this.db_port,
                dialect: 'postgres',
                logging: false,
            }
        );
        
        sequelize.authenticate().then(() => {
            log('Connection has been established successfully.');
        }).catch((error) => {
            log(`credentials: ${this.db_user}:${this.db_pass}@${this.db_host}:${this.db_port}/${this.db_name}`);
            log('Unable to connect to the database:' + error);
        });

        this.sequelize = sequelize;

    }

    initModels(sequelize: Sequelize) {
        const models = {
            User: initUser(sequelize),
            MiningHardware: initMiningHardware(sequelize),
        };

        return models;
    }

    async initTables() {
        await this.sequelize.sync();
        // if Antminer S1 is not in the database, then seed the database
        const miningHardware = await MiningHardware.findOne({
            where: {
                name: "Antminer S1"
            }
        });
        if (!miningHardware) {
            await MiningHardware.bulkCreate([
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

            log('Database seeded');
        }

    }
}

export default new Server().server;
