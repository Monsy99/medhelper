const nextJest = require("next/jest");

// next/jest loads next.config.ts and .env files, and applies the same SWC
// transform Next.js uses, so tests don't need a separate Babel config.
const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "/.next/"],
};

module.exports = createJestConfig(config);
