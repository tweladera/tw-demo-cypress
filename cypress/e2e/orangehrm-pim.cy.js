// Import page objects
import PIMPage from '../support/pages/PIMPage';
import NavigationComponent from '../support/pages/NavigationComponent';

describe('OrangeHRM PIM Tests', () => {
  beforeEach(() => {
    // Login before each test
    cy.loginWithEnvCredentials();

    // Navigate to PIM page
    NavigationComponent.navigateToPIM();
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

    // Verify form is reset
    cy.get('.oxd-input').eq(1).should('have.value', '');
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

    // Verify Reports page is displayed
    cy.contains('.oxd-text--h5', 'Employee Reports').should('be.visible');
  })

  it('should navigate to Configuration section', () => {
    NavigationComponent.navigateToCustomFields();

    // Verify Custom Fields page is displayed
    cy.contains('.oxd-text--h6', 'Custom Fields').should('be.visible');
  })
})
