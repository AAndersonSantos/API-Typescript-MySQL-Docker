import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from '../src/routes/UserRoutes';

dotenv.config();

const app = express();
// eslint-disable-next-line no-unused-vars
const port: string = process.env.PORT_TEST || '8100';

app.use(bodyParser.json());
app.use('/api', userRoutes);

export { app };
