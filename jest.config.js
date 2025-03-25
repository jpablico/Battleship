/** @type {import('jest').Config} */
export default {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.m?js$": "babel-jest"
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"]
};