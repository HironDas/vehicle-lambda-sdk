const { createDefaultPreset } = require('ts-jest')
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  ...createDefaultPreset(),
  testEnvironment: "jsdom",
  setupFiles: ['./jest.setup.ts'],
  preset: 'ts-jest',
};