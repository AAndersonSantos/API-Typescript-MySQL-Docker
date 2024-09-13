/* eslint-disable no-console */
import 'dotenv/config';
import { AppDataSource } from '../../src/data-source';
import { app } from '../serverTest';
import { createServer, Server } from 'http';

let server: Server;

const startServer = (port: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    server = createServer(app);
    server.listen(port, (err?: Error) => {
      if (err) {
        console.error(`Error starting server on port ${port}:`, err);
        return reject(err);
      }
      console.log(`Test server running on port ${port}`);
      resolve();
    });
  });
};

const stopServer = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close((err?: Error) => {
        if (err) {
          console.error('Error closing server:', err);
          return reject(err);
        }
        console.log('Test server closed');
        resolve();
      });
    } else {
      resolve();
    }
  });
};

beforeAll(async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source initialized');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    throw error;
  }

  const port = Number(process.env.PORT_TEST) || 8100;
  await startServer(port);
}, 10000);

afterAll(async () => {
  await stopServer();

  if (AppDataSource.isInitialized) {
    try {
      await AppDataSource.destroy();
      console.log('Data Source destroyed');
    } catch (error) {
      console.error('Error during Data Source destruction:', error);
    }
  }
}, 10000);
