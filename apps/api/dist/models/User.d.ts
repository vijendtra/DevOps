import { Sequelize, Model } from 'sequelize';
export declare class User extends Model {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    active: boolean;
}
export declare const initUser: (sequelize: Sequelize) => void;
//# sourceMappingURL=User.d.ts.map