import { Model } from "sequelize";

export interface ITuristSpot extends Model{
    id: number;
    idAdmin: number;
    average: number;
    totalVisitsReceived: number;
    history: string;
    state: string; //address
    city: string;
    street: string;
    postalCode: string;
    isActive: boolean; //status
    createdAt: Date;
    updatedAt: Date;
}
