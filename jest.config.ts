import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"], // ✅ Load setup before tests
  testEnvironment: "jsdom", // ✅ Ensures tests run in a browser-like environment
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // ✅ Fixes `@/components` imports
  },
  transform: {
    "^.+\\.tsx?$": ["babel-jest", { presets: ["next/babel"] }], // ✅ Transpile TS/JSX
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json", // ✅ Ensure TypeScript is configured correctly
    },
  },
};

export default config;
