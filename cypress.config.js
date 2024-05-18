const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Api Test report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    failOnStatusCode: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    env:{
      url: "https://shazam.p.rapidapi.com/artists/get-top-songs",
      apiKey: "c6cfae4770mshfa1364e50bc1a23p11c49bjsn88f8e97d46c0",
      host: "shazam.p.rapidapi.com"
    }
  },
});