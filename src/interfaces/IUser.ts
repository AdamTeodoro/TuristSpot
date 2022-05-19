import { Model } from "sequelize";

export interface IUser extends Model {
    id: number;
    userName: string;
    fullName: string;
    email: string;
    createdAt: number;
    updatedAt: number;
}
