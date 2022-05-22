import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

import { IUser } from '../interfaces/IUser';

import { db } from '../database/database';

export type UserModel = typeof Model & {
 new (values?: Partial<IUser>, options?: BuildOptions): IUser
}

export type UserData = {
    userName: string;
    fullName: string;
    email: string;
}

class UserService {
    
    private userModel: UserModel;

    private build(sequelize: Sequelize) {
        return sequelize.define("User", {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, { tableName: "USERS", timestamps: true }) as UserModel;
    }
    
    constructor(sequelize: Sequelize) {
        this.userModel = this.build(sequelize);
    }

    create(userData: UserData) {
        return this.userModel.create(userData);
    }

    getByEmail(email: string) {
        return this.userModel.findOne({
            where: {
                email
            }
        });
    }

    getById(id: number) {
        return this.userModel.findOne({
            where: {
                id
            }
        });
    }

    async update(id: number, user: UserData) {
        const refUser = await this.userModel.findOne({
            where: {
                id
            }
        }) as IUser;
        refUser.set(user);
        return refUser.save();
    }

}

export const userService = new UserService(db);
