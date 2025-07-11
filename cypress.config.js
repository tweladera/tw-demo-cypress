const { defineConfig } = require('cypress')
const cypressOnFix = require('cypress-on-fix')
require('dotenv').config()

async function setupNodeEvents(on, config) {
  on = cypressOnFix(on)
  require('cypress-mochawesome-reporter/plugin')(on)

  return {
    ...config,
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php',

  }
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    /** ================================================ **
     ** Environment variables
     ** ================================================ **/
    env: {
      ORANGEHRM_USERNAME: process.env.ORANGEHRM_USERNAME,
      ORANGEHRM_PASSWORD: process.env.ORANGEHRM_PASSWORD
    },
    /** ================================================ **
     ** Base Configuration
     ** ================================================ **/
    viewportWidth: 1600,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    video: true,
    watchForFileChanges: false,
    screenshotOnRunFailure: true,

    // Results folder
    videosFolder: 'cypress/results/videos',
    screenshotsFolder: 'cypress/results/screenshots',
    chromeWebSecurity: false,
    /** ================================================ **
     ** Advanced configuration
     ** ================================================ **/
    experimentalInteractiveRunEvents: true,
		experimentalModifyObstructiveThirdPartyCode: true,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',

    /** ================================================ **
     ** Report Options
     ** ================================================ **/
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'cypress-mochawesome-reporter',
      cypressMochawesomeReporterReporterOptions: {
        charts: true,
        saveJson: true,
        reportPageTitle: 'Cypress Report Test',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        screenshotsFolder: './cypress/results/screenshots',
        videosFolder: './cypress/results/videos',
        overwrite: true,
        reportDir: 'cypress/results/mocha-report',
        reportFilename: '[status]_[datetime]-cypress-report',
        embedVideo: true,
        quiet: true,
      },
    },
  },
})
