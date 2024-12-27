const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testTimeout: 20000,
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,tsx,ts}',
    '!src/**/*.(stories).{js,tsx,ts}',
    '!src/**/index.{js,tsx,ts}',
    '!src/**/*.(types).{js,tsx,ts}',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/infrastructure',
    '<rootDir>/public',
    '<rootDir>/src/types',
  ],
  coverageThreshold: {
    global: {
      statements: 67,
      branches: 51,
      functions: 67,
      lines: 70,
    },
  },
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '^@test/(.*)$': '<rootDir>/test/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@api/(.*)$': '<rootDir>/src/app/api/$1',
    '^@usecases/(.*)$': '<rootDir>/src/usecases/$1',
    '^@hof/(.*)$': '<rootDir>/src/hof/$1',
  },
};

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
  };
};

module.exports = jestConfig;
