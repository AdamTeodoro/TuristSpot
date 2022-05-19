import { Model } from "sequelize";

export interface IKey extends Model {
    id: number;
    email: string;
    passwordHash: string;
}
