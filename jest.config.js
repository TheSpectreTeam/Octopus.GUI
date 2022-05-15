/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', "<rootDir>/mocks.js"],
    moduleDirectories: ['node_modules', "utils", __dirname]
};