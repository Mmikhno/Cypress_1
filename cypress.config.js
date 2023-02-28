const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      viewportHeightMobile: 480,
      viewportWidthMobile: 320,
      viewportHeightLaptop: 720,
      viewportWidthLaptop: 1280,
    },
  },
});
