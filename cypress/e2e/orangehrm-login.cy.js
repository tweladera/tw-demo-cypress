/// <reference types="cypress" />
// Import page objects
import LoginPage from '../support/pages/LoginPage';
import DashboardPage from '../support/pages/DashboardPage';

describe('OrangeHRM Login Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
    // Inject axe-core for WCAG 2.1 AA checks on every test that visits this page
    cy.injectAxe();
  })

  it('should have no WCAG 2.1 AA violations on the Login page', () => {
    cy.checkA11y(undefined, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    }, (violations) => {
      violations.forEach(v =>
        cy.log(`[a11y] ${v.impact?.toUpperCase()}: ${v.description} — ${v.helpUrl}`)
      );
    });
  })

  it('should display the login page correctly', () => {
    LoginPage
      .verifyLogoIsVisible()
      .verifyFormElementsAreVisible()
      .verifyLoginTitle();
  })

  it('should login successfully with valid credentials from environment variables', () => {
    // Use the custom command that uses environment variables
    cy.loginWithEnvCredentials();

    // Verify successful login
    DashboardPage.verifyDashboardIsDisplayed();
  })

  it('should login successfully with valid credentials from fixture', () => {
    // Load test data from fixture
    cy.fixture('orangehrm').then((data) => {
      // Login with valid credentials from fixture
      LoginPage
        .typeUsername(data.validUser.username)
        .typePassword(data.validUser.password)
        .clickLogin();

      // Verify successful login
      LoginPage.verifySuccessfulLogin();
    })
  })

  it('should show error message with invalid credentials', () => {
    // Load test data from fixture
    cy.fixture('orangehrm').then((data) => {
      // Login with invalid credentials
      LoginPage
        .typeUsername(data.invalidUser.username)
        .typePassword(data.invalidUser.password)
        .clickLogin();

      // Verify error message
      LoginPage.verifyErrorMessage();
    })
  })

  it('should validate required fields', () => {
    // Click login without entering credentials
    LoginPage.clickLogin();

    // Verify validation messages
    LoginPage.verifyValidationErrors();
  })

  it('should have "Forgot your password?" link that navigates to reset password page', () => {
    // Check if the forgot password link exists and click it
    LoginPage.clickForgotPassword();

    // Verify navigation to reset password page — delegated to POM
    LoginPage.verifyForgotPasswordPage();
  })
})
