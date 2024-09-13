/* eslint-disable no-console */
import { AppDataSource } from '../../src/data-source';

export default async () => {
  try {
    // Inicializar a conexão com o banco de dados
    await AppDataSource.initialize();
    console.log('Global Data Source initialized');
  } catch (error) {
    console.error('Error during global setup:', error);
    process.exit(1); // Interromper os testes se a configuração falhar
  }
};
