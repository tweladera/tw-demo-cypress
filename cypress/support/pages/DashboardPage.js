class DashboardPage {
    // Selectors
    dashboardTitle = '.oxd-topbar-header-title';
    glassButton = '.oxd-glass-button';
    
    // Actions
    verifyDashboardIsDisplayed() {
        cy.url().should('contain', '/dashboard');
        cy.get(this.dashboardTitle).should('contain', 'Dashboard');
        return this;
    }
    
    verifyWidgetsAreVisible() {
        cy.get(this.glassButton)
            .should('be.visible')
            .and('contain', 'U');
        return this;
    }
}

export default new DashboardPage();