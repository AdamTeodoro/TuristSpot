import 'reflect-metadata';

import express from 'express';
import swagger from 'swagger-ui-express';
import { resolve } from 'path';


import * as swaggerDoc from "./swagger.json";

import { adminRoute } from './routes/admin.route';
import { publicRoute } from './routes/public.route';
import { userRoute } from './routes/user.route';

const app = express();

app.use(express.json());
app.use(adminRoute);
app.use(publicRoute);
app.use(userRoute);
app.use('/images', express.static(resolve(__filename, '..', '..', 'images')));
app.use('/documentation', swagger.serve, swagger.setup(swaggerDoc));

app.listen(3333, () => console.log('Its running in port: http://localhost:3333'));
