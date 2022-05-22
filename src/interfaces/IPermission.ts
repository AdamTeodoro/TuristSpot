import { Model } from "sequelize";

export interface IPermission extends Model {
    id: number; //idPermission
    idAdmin: number;
    token: string;
    expiration: Date;
    createdAt: Date;
    updatedAt: Date;
}
