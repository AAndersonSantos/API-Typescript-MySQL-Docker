import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/UserRoutes';
import { AppDataSource } from './data-source';

dotenv.config();

const app = express();
const port = process.env.PORT || '8080';

app.use(bodyParser.json());

app.use('/api', userRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, async () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.log('Error during Data Source initialization:', error));

export { app };
