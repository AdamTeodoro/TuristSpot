import { BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

import bcrypt from 'bcrypt';

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

class KeyService {
    private keyModel: KeyModel;

    private build(sequelize: Sequelize) {
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
                primaryKey: true,
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

    constructor(sequelize: Sequelize) {
        this.keyModel = this.build(sequelize);

        this.keyModel.beforeCreate('generateHash', async (Key, option) => {
            const passwordHash = await bcrypt.hash(Key.passwordHash, 10);
            Key.passwordHash = passwordHash;
        });
        
        this.keyModel.beforeUpdate('updateHash', async (Key, option) => {
            const passwordHash = await bcrypt.hash(Key.passwordHash, 10);
            Key.passwordHash = passwordHash;
        });
    }

    getById(id: number) {
        return this.keyModel.findOne({ where: { id }});
    }

    create(key: KeyData) {
        return this.keyModel.create(key);
    }
}

export const keyService = new KeyService(db);
