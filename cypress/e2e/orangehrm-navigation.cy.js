// Import page objects
import DashboardPage from '../support/pages/DashboardPage';

describe('OrangeHRM Navigation Tests', () =>  {
  beforeEach( () => {
    cy.loginWithEnvCredentials();
    cy.injectAxe();
  })

  it('should have no WCAG 2.1 AA violations on the Dashboard', () => {
    cy.checkA11y(undefined, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    }, (violations) => {
      violations.forEach(v =>
        cy.log(`[a11y] ${v.impact?.toUpperCase()}: ${v.description} — ${v.helpUrl}`)
      );
    });
  })

  it('should display the dashboard after login', () => {
    DashboardPage
      .verifyDashboardIsDisplayed()
      .verifyWidgetsAreVisible();
  })
})
