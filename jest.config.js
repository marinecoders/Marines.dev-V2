export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  testTimeout: 60000,
  verbose: true,
  collectCoverage: false,
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  // Force Jest to exit after tests complete
  forceExit: true,
  // Detect open handles to help debug
  detectOpenHandles: true,
  // Set up globals
  setupFilesAfterEnv: ['<rootDir>/tests/jest-setup.js']
};
