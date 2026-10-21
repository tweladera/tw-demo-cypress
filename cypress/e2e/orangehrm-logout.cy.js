// Import page objects
import LogoutPage from '../support/pages/LogoutPage';
import DashboardPage from '../support/pages/DashboardPage';

describe('OrangeHRM Logout Tests', () => {
  beforeEach(() => {
    cy.loginWithEnvCredentials();
    cy.injectAxe();
  })

  it('should have no WCAG 2.1 AA violations on the post-login Dashboard (logout flow entry)', () => {
    cy.checkA11y(undefined, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    }, (violations) => {
      violations.forEach(v =>
        cy.log(`[a11y] ${v.impact?.toUpperCase()}: ${v.description} — ${v.helpUrl}`)
      );
    });
  })

  it('should display logout option in the user dropdown menu', () => {
    LogoutPage
      .openUserDropdown()
      .verifyUserDropdownIsOpen()
      .verifyDropdownContainsLogout();
  })

  it('should logout successfully and redirect to login page', () => {
    LogoutPage.logout();

    LogoutPage.verifyLoggedOut();
  })

  it('should not allow access to protected pages after logout', () => {
    LogoutPage.logout();
    LogoutPage.verifyLoggedOut();

    // Attempt to visit a protected route — should redirect back to login
    // Path is relative to baseUrl (https://opensource-demo.orangehrmlive.com/web/index.php)
    LogoutPage.verifyProtectedPageRedirectsToLogin('/dashboard/index');
  })
})
