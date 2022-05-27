import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";

import { IPermission } from "../interfaces/IPermission";

import { db } from "../database/database";

export type PermissionModel = typeof Model & {
    new (values?: Partial<IPermission>, options?: BuildOptions): IPermission
}

export type PermissionData = {
    idAdmin: number;
    permissionHash: string;
    expiration: Date;
    isActive: boolean;
}


function build(sequelize: Sequelize) {
    return sequelize.define("Permission", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        idAdmin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'Admin'
            }
        },
        permissionHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, { tableName: "PERMISSIONS", timestamps: true }) as PermissionModel;
}


export const permissionService = build(db);
