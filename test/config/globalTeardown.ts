/* eslint-disable no-console */
import { AppDataSource } from '../../src/data-source';

// Função assíncrona padrão para realizar a limpeza (teardown) global após os testes.
export default async () => {
  if (AppDataSource.isInitialized) {
    try {
      await AppDataSource.destroy();
      console.log('Global Data Source destroyed');
    } catch (error) {
      console.error('Error during global teardown:', error);
    }
  }
};
