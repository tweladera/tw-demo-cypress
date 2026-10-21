// Import page objects
import PIMPage from '../support/pages/PIMPage';
import NavigationComponent from '../support/pages/NavigationComponent';

describe('OrangeHRM PIM Tests', () => {
  beforeEach(() => {
    cy.loginWithEnvCredentials();
    NavigationComponent.navigateToPIM();
    cy.injectAxe();
  })

  it('should have no WCAG 2.1 AA violations on the PIM Employee List page', () => {
    cy.checkA11y(undefined, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    }, (violations) => {
      violations.forEach(v =>
        cy.log(`[a11y] ${v.impact?.toUpperCase()}: ${v.description} — ${v.helpUrl}`)
      );
    });
  })

  it('should display the PIM page with Employee Information section', () => {
    PIMPage
      .verifyEmployeeInformationSectionVisible()
      .verifySearchFormVisible()
      .verifyTableVisible()
      .verifyTableHeaders();
  })

  it('should search for an employee', () => {
    PIMPage
      .searchForEmployee('0001')
      .clickSearch()
      .verifySearchResults();
  })

  it('should reset search form', () => {
    PIMPage
      .searchForEmployee('0001')
      .clickReset();

    // Verify form is reset — label-anchored selector replaces former .oxd-input.eq(1)
    PIMPage.verifyEmployeeIdFieldIsEmpty();
  })

  it('should navigate to Add Employee page', () => {
    PIMPage
      .clickAdd()
      .verifyAddEmployeePage();
  })

  it('should fill out Add Employee form', () => {
    // Navigate to Add Employee page
    PIMPage.clickAdd();

    // Load employee data from fixture
    cy.fixture('orangehrm').then((data) => {
      // Fill out the form
      PIMPage
        .fillEmployeeDetails(
          data.employeeData.firstName,
          data.employeeData.middleName,
          data.employeeData.lastName
        )
        .toggleCreateLoginDetails()
        .fillLoginDetails('testuser123', 'Password123!', 'Password123!');

      // We won't actually save the form to avoid modifying the demo site data
      // Instead, we'll verify the form is filled out correctly
      PIMPage.verifyEmployeeDetailsEntered(
        data.employeeData.firstName,
        data.employeeData.middleName,
        data.employeeData.lastName
      );
    });
  })

  it('should navigate to Reports page', () => {
    NavigationComponent.navigateToReports();

    cy.contains('h5', 'Employee Reports').should('be.visible');
  })

  it('should navigate to Configuration section', () => {
    NavigationComponent.navigateToCustomFields();

    cy.contains('h6', 'Custom Fields').should('be.visible');
  })
})
