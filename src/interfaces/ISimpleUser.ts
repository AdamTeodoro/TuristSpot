import { Model } from 'sequelize';

export interface ISimpleUser extends Model {
    id: number;
    isActive: boolean;
}
