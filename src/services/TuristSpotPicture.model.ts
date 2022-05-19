


import { BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

import { iTuristSpotPicture } from '../interfaces/ITuristSpotPicture';

import { db } from '../database/database';

type TuristSpotPictureModel = typeof Model & {
 new (values?: Partial<iTuristSpotPicture>, options?: BuildOptions): iTuristSpotPicture
}

class TuristSpotPictureService {
    private tusitSpotModel: TuristSpotPictureModel;
    
    private build(sequelize: Sequelize) {
        return sequelize.define("TuristSpotPicture", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
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
            imgURL: {
                type: DataTypes.TEXT,
                allowNull: false,
            }
        }, { tableName: "TURISTSPOTPICTURES", timestamps: true }) as TuristSpotPictureModel;
    }

    constructor(sequelize: Sequelize) {
        this.tusitSpotModel = this.build(sequelize);
    }
}

export const turistSpotPictureService = new TuristSpotPictureService(db);
