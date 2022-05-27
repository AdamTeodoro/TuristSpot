
import { BuildOptions, DataTypes, Model, Sequelize, STRING} from 'sequelize';

import { IRating } from '../interfaces/IRating';

import { db } from '../database/database';

import { IRatingPicture } from '../interfaces/IRatingPicture';

export type RatingPictureModel = typeof Model & {
 new (values?: Partial<IRating>, options?: BuildOptions): IRatingPicture
}

function build(sequelize: Sequelize) {
    return sequelize.define("RatingPicture", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idSimpleUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'SimpleUser'
            }
        },
        idTuristSpot: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'TuristSpot'
            }
        },
        idRating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'Rating'
            }
        },
        originalname: {
            type: STRING,
            allowNull: false
        },
        filename: {
            type: STRING,
            allowNull: false
        },
        imgUrl: {
            type: DataTypes.VIRTUAL
        }
    }, { tableName: "RATINGPICTURES", timestamps: true }) as RatingPictureModel;
}

export const ratingPictureService = build(db);
