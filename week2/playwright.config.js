const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: process.env.CI ? 2 : 1, // more retries in CI
  use: {
    headless: process.env.CI ? true : false, // headless in CI, headed locally
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  reporter: [
    ["html"],                          // HTML report
    ["list"],                          // terminal output
    ["junit", { outputFile: "results.xml" }], // for CI systems
  ],
});