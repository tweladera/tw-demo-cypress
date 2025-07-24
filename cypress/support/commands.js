// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Import page objects
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

Cypress.Commands.add('loginToOrangeHRM', (username, password) => {
  LoginPage.visit()
    .typeUsername(username)
    .typePassword(password)
    .clickLogin();

  // Wait for dashboard to load
  DashboardPage.verifyDashboardIsDisplayed();
})

// Helper command to login with credentials from .env
Cypress.Commands.add('loginWithEnvCredentials', () => {
  cy.loginToOrangeHRM(
    Cypress.env('ORANGEHRM_USERNAME'),
    Cypress.env('ORANGEHRM_PASSWORD')
  )
})
