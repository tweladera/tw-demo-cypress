describe('OrangeHRM Navigation Tests', () =>  {
beforeEach( () => {
    cy.loginWithEnvCredentials()
})

it('should display the dashboard after login', () => {
    cy.url().should('contain', '/dashboard')
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard')

    // widgets
    cy.get('.oxd-glass-button')
    .should('be.visible')
    .and('contain', 'U')
})
})