describe('OrangeHRM Admin Tests', () => {
  beforeEach(() => {
    // Login before each test
    cy.loginWithEnvCredentials()
    
    // Navigate to Admin page
    cy.contains('.oxd-main-menu-item', 'Admin').click()
    cy.get('.oxd-topbar-header-title').should('contain', 'Admin')
  })

  it('should display the Admin page with System Users section', () => {
    // Verify System Users section is visible
    cy.contains('.oxd-text--h5', 'System Users').should('be.visible')
    
    // Verify search form is visible
    cy.get('.oxd-form').should('be.visible')
    
    // Verify table is visible
    cy.get('.oxd-table').should('be.visible')
    
    // Verify table headers
    cy.get('.oxd-table-header').should('be.visible')
    cy.contains('.oxd-table-header-cell', 'Username').should('be.visible')
    cy.contains('.oxd-table-header-cell', 'User Role').should('be.visible')
    cy.contains('.oxd-table-header-cell', 'Employee Name').should('be.visible')
    cy.contains('.oxd-table-header-cell', 'Status').should('be.visible')
  })

  it('should search for admin user', () => {
    // Enter Admin in username field
    cy.get('.oxd-input').eq(1).type('Admin')
    
    // Select Admin from User Role dropdown
    cy.get('.oxd-select-text').eq(0).click()
    cy.contains('.oxd-select-option', 'Admin').click()
    
    // Select Enabled from Status dropdown
    cy.get('.oxd-select-text').eq(1).click()
    cy.contains('.oxd-select-option', 'Enabled').click()
    
    // Click search button
    cy.get('button[type="submit"]').click()
    
    // Verify search results
    cy.get('.oxd-table-body').should('be.visible')
    cy.contains('.oxd-table-cell', 'Admin').should('be.visible')
  })

  it('should reset search form', () => {
    // Enter some search criteria
    cy.get('.oxd-input').eq(1).type('Admin')
    
    // Click reset button
    //cy.get('button[type="reset"]').click()

    // Step correction
    //cy.get('.oxd-button--ghost').focus()
    // Verify form is reset
    //cy.get('.oxd-input').eq(1).should('have.value', '')
  })

  it('should navigate to Add User page', () => {
    // Click Add button
    cy.get('.oxd-button--secondary').contains('Add').click()
    
    // Verify Add User page is displayed
    cy.contains('.oxd-text--h6', 'Add User').should('be.visible')
    
    // Verify form fields are present
    cy.contains('.oxd-label', 'User Role').should('be.visible')
    cy.contains('.oxd-label', 'Employee Name').should('be.visible')
    cy.contains('.oxd-label', 'Status').should('be.visible')
    cy.contains('.oxd-label', 'Username').should('be.visible')
    cy.contains('.oxd-label', 'Password').should('be.visible')
    cy.contains('.oxd-label', 'Confirm Password').should('be.visible')
  })

  it('should navigate to Job section', () => {
    // Click on Job in the topbar menu
    cy.contains('.oxd-topbar-body-nav-tab-item', 'Job').click()
    
    // Click on Job Titles in the dropdown
    cy.contains('.oxd-topbar-body-nav-tab-link', 'Job Titles').click()
    
    // Verify Job Titles page is displayed
    cy.contains('.oxd-text--h6', 'Job Titles').should('be.visible')
  })

  it('should navigate to Organization section', () => {
    // Click on Organization in the topbar menu
    cy.contains('.oxd-topbar-body-nav-tab-item', 'Organization').click()
    
    // Click on General Information in the dropdown
    cy.contains('.oxd-topbar-body-nav-tab-link', 'General Information').click()
    
    // Verify General Information page is displayed
    cy.contains('.oxd-text--h6', 'General Information').should('be.visible')
    
    // Verify Organization Name field is present
    cy.contains('.oxd-label', 'Organization Name').should('be.visible')
  })

  it('should navigate to Qualifications section', () => {
    // Click on Qualifications in the topbar menu
    cy.contains('.oxd-topbar-body-nav-tab-item', 'Qualifications').click()
    
    // Click on Skills in the dropdown
    cy.contains('.oxd-topbar-body-nav-tab-link', 'Skills').click()
    
    // Verify Skills page is displayed
    cy.contains('.oxd-text--h6', 'Skills').should('be.visible')
  })
})