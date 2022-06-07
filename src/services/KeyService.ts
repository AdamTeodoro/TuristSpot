import { BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

import bcrypt from 'bcrypt';

import { db } from '../database/database';

import { IKey } from '../interfaces/IKey';

export type KeyModel = typeof Model & {
    new (values?: Partial<IKey>, options?: BuildOptions): IKey
}

export type KeyData = {
    id: number;
    passwordHash: string;
};

function build(sequelize: Sequelize) {
    const Key = sequelize.define("Key", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                key: 'id',
                model: 'User'
            }
        },
        passwordHash: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, { tableName: "KEYS", timestamps: false }) as KeyModel;

    Key.beforeCreate('generateHash', async (Key, option) => {
        const passwordHash = await bcrypt.hash(Key.passwordHash, 10);
        Key.passwordHash = passwordHash;
    });
    
    Key.beforeUpdate('updateHash', async (Key, option) => {
        const passwordHash = await bcrypt.hash(Key.passwordHash, 10);
        Key.passwordHash = passwordHash;
    });

    return Key;
}

export const keyService = build(db);


