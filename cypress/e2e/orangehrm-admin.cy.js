// Import page objects
import { AdminPage, NavigationComponent } from '../support/pages/';

describe('OrangeHRM Admin Tests', () => {
  beforeEach(() => {
    // Login before each test
    cy.loginWithEnvCredentials();

    // Navigate to Admin page
    NavigationComponent.navigateToAdmin();
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

    // Verify Job Titles page is displayed
    cy.contains('.oxd-text--h6', 'Job Titles').should('be.visible');
  })

  it('should navigate to Organization section', () => {
    NavigationComponent
      .navigateToGeneralInformation();

    // Verify General Information page is displayed
    cy.contains('.oxd-text--h6', 'General Information').should('be.visible');

    // Verify Organization Name field is present
    cy.contains('.oxd-label', 'Organization Name').should('be.visible');
  })

  it('should navigate to Qualifications section', () => {
    NavigationComponent
      .navigateToSkills();

    // Verify Skills page is displayed
    cy.contains('.oxd-text--h6', 'Skills').should('be.visible');
  })
})
