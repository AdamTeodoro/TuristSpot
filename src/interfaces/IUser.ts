import { Model } from "sequelize";

export interface IUser extends Model {
    id: number;
    email: string;
    userName: string;
    fullName: string;
    createdAt: number;
    updatedAt: number;
}
