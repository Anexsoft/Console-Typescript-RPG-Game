export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@game/(.*)$': '<rootDir>/src/$1',
  },
  coverageDirectory: '../coverage',
  coverageThreshold: {
    global: {
      statements: 40,
      branches: 40,
      functions: 40,
      lines: 40,
    },
  },
  testPathIgnorePatterns: ['/node_modules/'],
};
