import 'reflect-metadata';

import express from 'express';

import { adminRoute } from './routes/admin.route';
import { publicRoute } from './routes/public.route';
import { userRoute } from './routes/user.route';

const app = express();

app.use(express.json());
app.use(adminRoute);
app.use(publicRoute);
app.use(userRoute);

app.listen(3333, () => console.log('Its running in port: http://localhost:3333'));
