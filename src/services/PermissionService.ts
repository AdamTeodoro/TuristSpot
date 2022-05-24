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

