import { Model } from "sequelize";

export interface IPermission extends Model {
    id: number; //idPermission
    idAdmin: number;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}
