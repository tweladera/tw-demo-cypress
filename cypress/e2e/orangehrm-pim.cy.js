describe('OrangeHRM PIM Tests', () => {
  beforeEach(() => {
    // Login before each test
    cy.loginWithEnvCredentials()
    
    // Navigate to PIM page
    cy.contains('.oxd-main-menu-item', 'PIM').click()
    cy.get('.oxd-topbar-header-title').should('contain', 'PIM')
  })

  it('should display the PIM page with Employee Information section', () => {
    // Verify Employee Information section is visible
    cy.contains('.oxd-text--h5', 'Employee Information').should('be.visible')
    
    // Verify search form is visible
    cy.get('.oxd-form').should('be.visible')
    
    // Verify table is visible
    cy.get('.oxd-table').should('be.visible')
    
    // Verify table headers
    cy.get('.oxd-table-header').should('be.visible')
    cy.contains('.oxd-table-header-cell', 'Id').should('be.visible')
    cy.contains('.oxd-table-header-cell', 'First Name').should('be.visible')
    cy.contains('.oxd-table-header-cell', 'Last Name').should('be.visible')
    cy.contains('.oxd-table-header-cell', 'Job Title').should('be.visible')
    cy.contains('.oxd-table-header-cell', 'Employment Status').should('be.visible')
  })

  it('should search for an employee', () => {
    // Enter employee ID in the ID field
    cy.get('.oxd-input').eq(1).type('0001')
    
    // Click search button
    cy.get('button[type="submit"]').click()
    
    // Wait for search results
    cy.get('.oxd-table-body').should('be.visible')
  })

  it('should reset search form', () => {
    // Enter some search criteria
    cy.get('.oxd-input').eq(1).type('0001')
    
    // Click reset button
    cy.get('button[type="reset"]').click()
    
    // Verify form is reset
    cy.get('.oxd-input').eq(1).should('have.value', '')
  })

  it('should navigate to Add Employee page', () => {
    // Click Add button
    cy.contains('button', 'Add').click()
    
    // Verify Add Employee page is displayed
    cy.contains('.oxd-text--h6', 'Add Employee').should('be.visible')
    
    // Verify form fields are present
    cy.contains('.oxd-label', 'First Name').should('be.visible')
    cy.contains('.oxd-label', 'Middle Name').should('be.visible')
    cy.contains('.oxd-label', 'Last Name').should('be.visible')
    cy.contains('.oxd-label', 'Employee Id').should('be.visible')
  })

  it('should fill out Add Employee form', () => {
    // Navigate to Add Employee page
    cy.contains('button', 'Add').click()
    
    // Load employee data from fixture
    cy.fixture('orangehrm').then((data) => {
      // Fill out the form
      cy.get('input[name="firstName"]').type(data.employeeData.firstName)
      cy.get('input[name="middleName"]').type(data.employeeData.middleName)
      cy.get('input[name="lastName"]').type(data.employeeData.lastName)
      
      // Toggle Create Login Details switch
      cy.get('.oxd-switch-input').click()
      
      // Fill out login details
      cy.get('.oxd-input').eq(4).clear().type('testuser123')
      cy.get('.oxd-input').eq(5).type('Password123!')
      cy.get('.oxd-input').eq(6).type('Password123!')
      
      // We won't actually save the form to avoid modifying the demo site data
      // Instead, we'll verify the form is filled out correctly
      cy.get('input[name="firstName"]').should('have.value', data.employeeData.firstName)
      cy.get('input[name="middleName"]').should('have.value', data.employeeData.middleName)
      cy.get('input[name="lastName"]').should('have.value', data.employeeData.lastName)
    })
  })

  it('should navigate to Reports page', () => {
    // Click on Reports in the topbar menu
    cy.contains('.oxd-topbar-body-nav-tab-item', 'Reports').click()
    
    // Verify Reports page is displayed
    cy.contains('.oxd-text--h5', 'Employee Reports').should('be.visible')
  })

  it('should navigate to Configuration section', () => {
    // Click on Configuration in the topbar menu
    cy.contains('.oxd-topbar-body-nav-tab-item', 'Configuration').click()
    
    // Click on Custom Fields in the dropdown
    cy.contains('.oxd-topbar-body-nav-tab-link', 'Custom Fields').click()
    
    // Verify Custom Fields page is displayed
    cy.contains('.oxd-text--h6', 'Custom Fields').should('be.visible')
  })
})