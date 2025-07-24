// Import page objects
import DashboardPage from '../support/pages/DashboardPage';

describe('OrangeHRM Navigation Tests', () =>  {
  beforeEach( () => {
    cy.loginWithEnvCredentials();
  })

  it('should display the dashboard after login', () => {
    DashboardPage
      .verifyDashboardIsDisplayed()
      .verifyWidgetsAreVisible();
  })
})
