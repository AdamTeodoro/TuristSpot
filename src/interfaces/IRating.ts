import { Model } from "sequelize";

export interface IRating extends Model {
    id: number;
    idSimpleUser: number;
    idTuristSpot: number;
    commentary: string;
    rating: number;
    qtdImg: number;
    createdAt: Date;
    updatedAt: Date;
}