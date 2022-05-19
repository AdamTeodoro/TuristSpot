import dotEnv from 'dotenv';
import path from 'path';

import config from '../config/config';

import { IEnvironment } from '../interfaces/IEnvironment';

export class EnvironmentService {

    private prodPath: string =  path.resolve('src', 'environment') + '/prod.env';
    private devPath: string =  path.resolve('src', 'environment') + '/dev.env';

    constructor(private isProduction: boolean) { }

    private getProd(): any {
        return dotEnv.config({ path:  this.prodPath }).parsed;
    }

    private getDev(): any {
        return dotEnv.config({ path: this.devPath }).parsed;
    }

    getEnvironmnet(): IEnvironment {
        if (this.isProduction) {
            return this.getProd();
        } else {
            return this.getDev();
        }
    }
}

export const environmentService = new EnvironmentService(config.isProduction);
