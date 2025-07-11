/// <reference types="cypress" />
describe('OrangeHRM Login Tests', () => {
  beforeEach(() => {
    cy.visit('/auth/login')
  })

  it('should display the login page correctly', () => {
    // Verify logo is visible
    cy.get('.orangehrm-login-branding img')
    .should('be.visible')
    .and('have.attr', 'src')
    //.and('include', 'orangehrm_logo.png')
    
    // Verify form elements are present
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
    
    // Verify login page title
    cy.get('.orangehrm-login-title').should('contain', 'Login')
  })

  it('should login successfully with valid credentials from environment variables', () => {
    // Use the custom command that uses environment variables
    cy.loginWithEnvCredentials()
    
    // Verify successful login by checking dashboard elements
    cy.url().should('include', '/dashboard/index')
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard')
  })

  it('should login successfully with valid credentials from fixture', () => {
    // Load test data from fixture
    cy.fixture('orangehrm').then((data) => {
      // Login with valid credentials from fixture
      cy.loginToOrangeHRM(data.validUser.username, data.validUser.password)

      // Verify successful login
      cy.url().should('include', '/dashboard/index')
      cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard')
    })
  })

  it('should show error message with invalid credentials', () => {
    // Load test data from fixture
    cy.fixture('orangehrm').then((data) => {
      // Login with invalid credentials
      cy.loginToOrangeHRM(data.invalidUser.username, data.invalidUser.password)

      // Verify error message
      cy.get('.oxd-alert-content').should('be.visible')
      cy.get('.oxd-alert-content').should('contain', 'Invalid credentials')
    })
  })

  it('should validate required fields', () => {
    // Click login without entering credentials
    cy.get('button[type="submit"]').click()
    
    // Verify validation messages
    cy.get('.oxd-input-field-error-message').should('have.length', 2)
    cy.get('.oxd-input-field-error-message').first().should('contain', 'Required')
  })

  it('should have "Forgot your password?" link that navigates to reset password page', () => {
    // Check if the forgot password link exists and click it
    cy.contains('.orangehrm-login-forgot-header', 'Forgot your password?').should('be.visible').click()
    
    // Verify navigation to reset password page
    cy.url().should('include', '/auth/requestPasswordResetCode')
    cy.get('.orangehrm-forgot-password-title').should('contain', 'Reset Password')
    cy.get('.orangehrm-card-note > .oxd-text').should('contain', 'Please')
  })
})