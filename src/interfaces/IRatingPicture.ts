import { Model } from "sequelize";

export interface IRatingPicture extends Model {
    id: number;
    idRating: number;
    idUser: number;
    idTuristSpot: number;
    createdAt: Date;
    updatedAt: Date;
    filename: string;
    originalname: string;
    imgUrl?: string;
}