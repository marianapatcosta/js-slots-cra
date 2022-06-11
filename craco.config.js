const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "@/assets/styles/_index.scss";
        `,
      },
    },
  },
  jest: {
    preset: 'ts-jest',
    collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', '!src/index.tsx'],
    coverageReporters: ['text'],
    moduleNameMapper: {
      '^@/(.+)': '<rootDir>/src/$1',
      '\\.(css|scss)$': '<rootDir>/__mocks__/style-mock.ts',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/file-mock.ts',
      i18next: '<rootDir>/__mocks__/i18next-mock.ts',
      'react-i18next': '<rootDir>/__mocks__/react-i18next-mock.ts',
      nanoid: '<rootDir>/__mocks__/nanoid-mock.ts',
    },
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    configure: {
      roots: ['<rootDir>/src'],
      testMatch: ['<rootDir>/spec/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    },
  }
};
