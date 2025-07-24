class AdminPage {
    // Selectors
    pageTitle = '.oxd-text--h5';
    searchForm = '.oxd-form';
    table = '.oxd-table';
    tableHeader = '.oxd-table-header';
    tableBody = '.oxd-table-body';
    usernameInput = '.oxd-input';
    userRoleDropdown = '.oxd-select-text';
    addButton = '.oxd-button--secondary';
    submitButton = 'button[type="submit"]';
    resetButton = 'button[type="reset"]';
    
    // Actions
    verifySystemUsersSectionVisible() {
        cy.contains(this.pageTitle, 'System Users').should('be.visible');
        return this;
    }
    
    verifySearchFormVisible() {
        cy.get(this.searchForm).should('be.visible');
        return this;
    }
    
    verifyTableVisible() {
        cy.get(this.table).should('be.visible');
        return this;
    }
    
    verifyTableHeaders() {
        cy.get(this.tableHeader).should('be.visible');
        cy.contains('.oxd-table-header-cell', 'Username').should('be.visible');
        cy.contains('.oxd-table-header-cell', 'User Role').should('be.visible');
        cy.contains('.oxd-table-header-cell', 'Employee Name').should('be.visible');
        cy.contains('.oxd-table-header-cell', 'Status').should('be.visible');
        return this;
    }
    
    searchForUser(username) {
        // Enter username in the username field (index 1 because there are multiple inputs)
        cy.get(this.usernameInput).eq(1).type(username);
        return this;
    }
    
    selectUserRole(role) {
        // Select role from User Role dropdown (index 0 for the first dropdown)
        cy.get(this.userRoleDropdown).eq(0).click();
        cy.contains('.oxd-select-option', role).click();
        return this;
    }
    
    selectStatus(status) {
        // Select status from Status dropdown (index 1 for the second dropdown)
        cy.get(this.userRoleDropdown).eq(1).click();
        cy.contains('.oxd-select-option', status).click();
        return this;
    }
    
    clickSearch() {
        cy.get(this.submitButton).click();
        return this;
    }
    
    clickReset() {
        cy.get(this.resetButton).click();
        return this;
    }
    
    clickAdd() {
        cy.get(this.addButton).contains('Add').click();
        return this;
    }
    
    verifySearchResults(username) {
        cy.get(this.tableBody).should('be.visible');
        cy.contains('.oxd-table-cell', username).should('be.visible');
        return this;
    }
    
    // Add User page verification
    verifyAddUserPage() {
        cy.contains('.oxd-text--h6', 'Add User').should('be.visible');
        cy.contains('.oxd-label', 'User Role').should('be.visible');
        cy.contains('.oxd-label', 'Employee Name').should('be.visible');
        cy.contains('.oxd-label', 'Status').should('be.visible');
        cy.contains('.oxd-label', 'Username').should('be.visible');
        cy.contains('.oxd-label', 'Password').should('be.visible');
        cy.contains('.oxd-label', 'Confirm Password').should('be.visible');
        return this;
    }
}

export default new AdminPage();