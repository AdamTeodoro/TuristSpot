
import { BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

import { iTuristSpotPicture } from '../interfaces/ITuristSpotPicture';

import { db } from '../database/database';
import config from '../config/config';
import { environmentService } from './EnvironmentService';

export type TuristSpotPictureModel = typeof Model & {
 new (values?: Partial<iTuristSpotPicture>, options?: BuildOptions): iTuristSpotPicture
}

export type TuristSpotPictureData = {
    idAdmin: number;
    idTuristSpot: number;
    originalname?: string,
    filename?: string;
}

function build(sequelize: Sequelize) {
    return sequelize.define("TuristSpotPicture", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        idTuristSpot: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'TuristSpot'
            }
        },
        idAdmin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: 'id',
                model: 'Admin'
            }
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        originalname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        imgUrl: {
            type: DataTypes.VIRTUAL,
            get() {
                const { URL_DEFAULT } = environmentService.getEnvironmnet();
                return `${URL_DEFAULT}/images/turistspotpictures/${this.getDataValue('filename')}`;
            }
        }
    }, { tableName: "TURISTSPOTPICTURES", timestamps: true }) as TuristSpotPictureModel;
}

export const turistSpotPictureService = build(db);
