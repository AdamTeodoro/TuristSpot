import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";

import { IAdmin } from "../interfaces/IAdmin";

import { db } from "../database/database";

export type AdminModel = typeof Model & {
    new (values?: Partial<IAdmin>, options?: BuildOptions): IAdmin
}

function build(sequelize: Sequelize) {
    return sequelize.define("Admin", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                key: 'id',
                model: 'User'
            }
        },
    }, { tableName: "ADMINS", timestamps: false }) as AdminModel;
}

export type AdminData = {
    id: number;
}

export const adminService = build(db);

