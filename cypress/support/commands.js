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


Cypress.Commands.add('loginToOrangeHRM', (username, password) => {
  cy.visit('/auth/login')
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
  // Wait for dashboard to load
  //cy.get('.oxd-topbar-header').should('be.visible')
})

// Helper command to login with credentials from .env
Cypress.Commands.add('loginWithEnvCredentials', () => {
  cy.loginToOrangeHRM(
    Cypress.env('ORANGEHRM_USERNAME'),
    Cypress.env('ORANGEHRM_PASSWORD')
  )
})