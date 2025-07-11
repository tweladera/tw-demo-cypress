/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to create a session with AAD authentication
     * @param username - The username for authentication
     * @param password - The password of the user
     * @example
     * cy.createSession('usuario@ejemplo.com', 'password123')
     */
    createSession(username: string, password: string): Chainable<void>
  }
}