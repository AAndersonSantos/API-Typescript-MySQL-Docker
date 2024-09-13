module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/test/**/*.test.ts'],
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/test/config/setup.ts'], // Arquivo para configuração de ambiente de teste
  globalSetup: '<rootDir>/test/config/globalSetup.ts', // Arquivo para configuração global
  globalTeardown: '<rootDir>/test/config/globalTeardown.ts', // Arquivo para limpeza global
};
