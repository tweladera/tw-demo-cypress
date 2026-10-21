// Import page objects
import LeavePage from '../support/pages/LeavePage';
import NavigationComponent from '../support/pages/NavigationComponent';

describe('OrangeHRM Leave Tests', () => {
  beforeEach(() => {
    cy.loginWithEnvCredentials();
    NavigationComponent.navigateToLeave();
    cy.injectAxe();
  })

  it('should have no WCAG 2.1 AA violations on the Leave List page', () => {
    cy.checkA11y(undefined, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    }, (violations) => {
      violations.forEach(v =>
        cy.log(`[a11y] ${v.impact?.toUpperCase()}: ${v.description} — ${v.helpUrl}`)
      );
    });
  })

  it('should display the Leave List page after navigation', () => {
    LeavePage
      .verifyLeaveListPageIsDisplayed()
      .verifyLeaveTableIsVisible();
  })

  it('should display the Apply Leave form with required fields', () => {
    NavigationComponent.navigateToApplyLeave();

    LeavePage
      .verifyApplyLeavePageIsDisplayed()
      .verifyFormLabelsPresent();
  })

  it('should display Apply Leave page state (no leave balance for Admin user in demo)', () => {
    NavigationComponent.navigateToApplyLeave();

    // NOTE: The OrangeHRM demo Admin user has no leave entitlements assigned,
    // so the Apply form shows "No Leave Types with Leave Balance" instead of a form.
    // This test verifies that expected state. To test the full form fill,
    // use an account with leave entitlements (e.g., an ESS user).
    LeavePage.verifyNoLeaveTypesMessage();
  })
})
