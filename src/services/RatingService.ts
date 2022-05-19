import { BuildOptions, DataTypes, Model, Sequelize} from 'sequelize';

import { IRating } from '../interfaces/IRating';

import { db } from '../database/database';

export type RatingModel = typeof Model & {
 new (values?: Partial<IRating>, options?: BuildOptions): IRating
}

class RatingService {
    private ratingModel: RatingModel;

    private build(sequelize: Sequelize) {
        return sequelize.define("Rating", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
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
            commentary: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            rating: {
                type: DataTypes.FLOAT,
                allowNull: false,
            }
        }, { tableName: "RATINGS", timestamps: true }) as RatingModel;
    }

    constructor(sequelize: Sequelize) {
        this.ratingModel = this.build(sequelize);
    }
}

export const ratingService = new RatingService(db);
