import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";

import { IPermission } from "../interfaces/IPermission";

import { db } from "../database/database";

export type PermissionModel = typeof Model & {
    new (values?: Partial<IPermission>, options?: BuildOptions): IPermission
}

export type PermissionData = {
    email: string;
    passwordHash: string;
}

class PermisisonService {

    private permissionModel: PermissionModel;

    private build(sequelize: Sequelize) {
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
            token: {
                type: DataTypes.TEXT,
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

    constructor(sequelize: Sequelize) {
        this.permissionModel = this.build(sequelize);
    }

    create(permissionData: PermissionData) {
        return this.permissionModel.create(permissionData);
    }

    getById(idPermission: number) {
        return this.permissionModel.findOne(
            { 
                where: {
                    id: idPermission,
                    isActive: true
                }
            }
        );
    }

}

export const permissionService = new PermisisonService(db);

