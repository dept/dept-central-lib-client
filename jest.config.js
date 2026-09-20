// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  // `src/**`, not `src/components/**`: scoped to components, a spec
  // anywhere else in src was silently never run — jest reported "no tests
  // found" only if you asked for that file by name.
  testMatch: ['<rootDir>/src/**/*.(spec|test).(j|t)s?(x)'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
};
