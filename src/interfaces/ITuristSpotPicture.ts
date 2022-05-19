import { Model } from "sequelize";

export interface iTuristSpotPicture extends Model {
    id: number;
    idTuristSpot: number;
    idAdmin: number;
    imgURL: string;
    createdAt: Date;
    updateAt: Date;
}
