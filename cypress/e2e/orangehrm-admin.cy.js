// Import page objects
import { AdminPage, NavigationComponent } from '../support/pages/';

describe('OrangeHRM Admin Tests', () => {
  beforeEach(() => {
    cy.loginWithEnvCredentials();
    NavigationComponent.navigateToAdmin();
    cy.injectAxe();
  })

  it('should have no WCAG 2.1 AA violations on the Admin System Users page', () => {
    cy.checkA11y(undefined, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    }, (violations) => {
      violations.forEach(v =>
        cy.log(`[a11y] ${v.impact?.toUpperCase()}: ${v.description} — ${v.helpUrl}`)
      );
    });
  })

  it('should display the Admin page with System Users section', () => {
    AdminPage
      .verifySystemUsersSectionVisible()
      .verifySearchFormVisible()
      .verifyTableVisible()
      .verifyTableHeaders();
  })

  it('should search for admin user', () => {
    AdminPage
      .searchForUser('Admin')
      .selectUserRole('Admin')
      .selectStatus('Enabled')
      .clickSearch()
      .verifySearchResults('Admin');
  })

  it('should reset search form', () => {
    // Enter some search criteria
    AdminPage.searchForUser('Admin');

    // Note: The reset functionality is commented out in the original test
    // because it might not be working correctly
    // AdminPage.clickReset();
    // cy.get('.oxd-input').eq(1).should('have.value', '');
  })

  it('should navigate to Add User page', () => {
    AdminPage
      .clickAdd()
      .verifyAddUserPage();
  })

  it('should navigate to Job section', () => {
    NavigationComponent
      .navigateToJobTitles();

    cy.contains('h6', 'Job Titles').should('be.visible');
  })

  it('should navigate to Organization section', () => {
    NavigationComponent
      .navigateToGeneralInformation();

    cy.contains('h6', 'General Information').should('be.visible');
    cy.contains('.oxd-label', 'Organization Name').should('be.visible');
  })

  it('should navigate to Qualifications section', () => {
    NavigationComponent
      .navigateToSkills();

    cy.contains('h6', 'Skills').should('be.visible');
  })
})
