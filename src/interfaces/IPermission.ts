import { Model } from "sequelize";

export interface IPermission extends Model {
    id: number; //idPermission
    idAdmin: number;
    permissionHash: string;
    expiration: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
