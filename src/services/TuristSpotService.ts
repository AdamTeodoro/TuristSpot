import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

import { ITuristSpot } from '../interfaces/ITuristSpot';

import { db } from '../database/database';

export type TuristSpotModel = typeof Model & {
 new (values?: Partial<ITuristSpot>, options?: BuildOptions): ITuristSpot
}

export type TuristSpotData = {
    idAdmin: number;
    average: number;
    totalVisitsReceived: number;
    history: string;
    state: string; //address
    city: string;
    street: string;
    postalCode: string;
    qtdRatings: number;
    isActive: boolean; //status
};

function build(sequelize: Sequelize) {
    return sequelize.define("TuristSpot", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        idAdmin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'Admin'
            }
        },
        average: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        totalVisitsReceived: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        qtdRatings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        history: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { tableName: "TURISTSPOTS", timestamps: true }) as TuristSpotModel;
}

export const turistSpotService = build(db);
