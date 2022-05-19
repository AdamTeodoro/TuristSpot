

import { Sequelize } from 'sequelize';
import { environmentService } from '../services/EnvironmentService';

const {
    DB_HOST, 
    DB_USER, 
    DB_PASS,
    DB_NAME, 
    DB_PORT, 
} = environmentService.getEnvironmnet();

export const db = new Sequelize({
    dialect: 'postgres',
    database: DB_NAME,
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    port: Number(DB_PORT),
});
