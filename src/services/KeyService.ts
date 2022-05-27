import { BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

import { db } from '../database/database';

import { IKey } from '../interfaces/IKey';

export type KeyModel = typeof Model & {
    new (values?: Partial<IKey>, options?: BuildOptions): IKey
}

export type KeyData = {
    id: number;
    email: string;
    passwordHash: string;
};

function build(sequelize: Sequelize) {
    return sequelize.define("Key", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                key: 'id',
                model: 'User'
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            references: {
                model: "User",
                key: 'email',
            }
        },
        passwordHash: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, { tableName: "KEYS", timestamps: false }) as KeyModel;
}

export const keyService = build(db);
