/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.test.ts", "!src/index.ts"],
  coverageReporters: ["text", "lcov"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
};
