
import { BuildOptions, DataTypes, Model, Sequelize, STRING} from 'sequelize';

import { IRating } from '../interfaces/IRating';

import { db } from '../database/database';

import { IRatingPicture } from '../interfaces/IRatingPicture';
import { environmentService } from './EnvironmentService';

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
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'User'
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
            allowNull: true
        },
        filename: {
            type: STRING,
            allowNull: true
        },
        imgUrl: {
            type: DataTypes.VIRTUAL,
            get() {
                const { URL_DEFAULT } = environmentService.getEnvironmnet();
                return `${URL_DEFAULT}/images/ratingpictures/${this.getDataValue('filename')}`;
            }
        }
    }, { tableName: "RATINGPICTURES", timestamps: true }) as RatingPictureModel;
}

export const ratingPictureService = build(db);
