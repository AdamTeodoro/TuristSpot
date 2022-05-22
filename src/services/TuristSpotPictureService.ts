
import { BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

import { iTuristSpotPicture } from '../interfaces/ITuristSpotPicture';

import { db } from '../database/database';

export type TuristSpotPictureModel = typeof Model & {
 new (values?: Partial<iTuristSpotPicture>, options?: BuildOptions): iTuristSpotPicture
}

export type TuristSpotPictureData = {
    idAdmin: number;
    idTuristSpot: number;
}

class TuristSpotPictureService {
    private turistSpotPictureModel: TuristSpotPictureModel;
    
    private build(sequelize: Sequelize) {
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
            }
        }, { tableName: "TURISTSPOTPICTURES", timestamps: true }) as TuristSpotPictureModel;
    }

    constructor(sequelize: Sequelize) {
        this.turistSpotPictureModel = this.build(sequelize);
    }

    create(data:TuristSpotPictureData) {
        return this.turistSpotPictureModel.create(data);
    }

    getById(id: number){
        return this.turistSpotPictureModel.findOne({ where: { id } });
    }
}

export const turistSpotPictureService = new TuristSpotPictureService(db);
