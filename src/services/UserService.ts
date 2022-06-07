import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

import { IUser } from '../interfaces/IUser';

import { db } from '../database/database';

export type UserModel = typeof Model & {
 new (values?: Partial<IUser>, options?: BuildOptions): IUser
}

export type UserData = {
    userName: string;
    fullName: string;
};

function build(sequelize: Sequelize) {
    return sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, { tableName: "USERS", timestamps: true }) as UserModel;
}

export const userService = build(db);
