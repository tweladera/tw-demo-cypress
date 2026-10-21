// Import page objects
import LoginPage from '../support/pages/LoginPage';

describe('OrangeHRM Password Reset Tests', () => {
  beforeEach(() => {
    LoginPage.visit();
    cy.injectAxe();
  })

  it('should have no WCAG 2.1 AA violations on the Login page (password reset flow entry)', () => {
    cy.checkA11y(undefined, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    }, (violations) => {
      violations.forEach(v =>
        cy.log(`[a11y] ${v.impact?.toUpperCase()}: ${v.description} — ${v.helpUrl}`)
      );
    });
  })

  it('should display the Reset Password form when clicking Forgot Password', () => {
    LoginPage
      .clickForgotPassword()
      .verifyForgotPasswordPage();
  })

  it('should show confirmation message after submitting a valid username', () => {
    cy.fixture('orangehrm').then((data) => {
      LoginPage
        .clickForgotPassword()
        .verifyForgotPasswordPage();

      // OrangeHRM triggers a full page navigation after submitting the reset form.
      // Raise pageLoadTimeout so Cypress waits long enough for the server to respond.
      cy.config('pageLoadTimeout', 120000);

      LoginPage
        .submitResetPasswordRequest(data.validUser.username)
        .verifyResetPasswordConfirmation();
    })
  })

  it('should show required field error when submitting empty reset form', () => {
    LoginPage.clickForgotPassword();
    LoginPage.verifyForgotPasswordPage();

    // Submit without entering a username
    cy.contains('button', 'Reset Password').click();

    LoginPage.verifyUsernameRequiredError();
  })
})
