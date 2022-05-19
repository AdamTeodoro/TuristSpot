import { BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

import { ISimpleUser } from '../interfaces/ISimpleUser';

import { db } from '../database/database';

export type SimpleUserModel = typeof Model & {
    new (values?: Partial<ISimpleUser>, options?: BuildOptions): ISimpleUser
}

export type SimpleUserData = {
    id: number;
    isActive: boolean;
}

class SimpleUserService {
    private simpleUserModel: SimpleUserModel;

    private build(sequelize: Sequelize) {
        return sequelize.define("SimpleUser", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    key: 'id',
                    model: 'User'
                }
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            }
        }, { tableName: "SIMPLEUSERS", timestamps: false }) as SimpleUserModel;
    }

    constructor(sequelize: Sequelize) {
        this.simpleUserModel = this.build(sequelize);
    }

    getIfActiveById(id: number) {
        return this.simpleUserModel.findOne({
            where: {
                id,
                isActive: true
            }
        });
    }

    getById(id: number) {
        return this.simpleUserModel.findOne({
            where: {
                id
            }
        });
    }

    create(simpleUser: SimpleUserData) {
        return this.simpleUserModel.create(simpleUser);
    }
    
}

export const simpleUserService = new SimpleUserService(db);

