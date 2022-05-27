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

function build(sequelize: Sequelize) {
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
export const simpleUserService = build(db);

