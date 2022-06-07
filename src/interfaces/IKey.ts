import { Model } from "sequelize";

export interface IKey extends Model {
    id: number;
    passwordHash: string;
}
