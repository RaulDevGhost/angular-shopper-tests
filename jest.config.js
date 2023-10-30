module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["./src/setup.jest.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.spec.json",
    },
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
};
