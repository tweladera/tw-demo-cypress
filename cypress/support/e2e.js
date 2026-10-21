// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mochawesome-reporter/register'
import 'cypress-plugin-api'
// Accessibility testing — cypress-axe provides cy.injectAxe() and cy.checkA11y()
// cypress-axe and axe-core are NOT in the corporate Artifactory registry.
// To enable: request Artifactory admin to add them, then run:
//   npm install --save-dev cypress-axe axe-core
// and uncomment the line below:
// import 'cypress-axe'

// OrangeHRM's app code throws unhandled promise rejections during navigation
// (e.g., when Cypress logs out and the Vue app tries to complete pending async requests).
// Since this is a third-party demo site, we suppress app-level errors globally.
Cypress.on('uncaught:exception', () => false)

