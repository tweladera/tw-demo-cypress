class PIMPage {
    // Selectors
    pageTitle = '.oxd-text--h5';
    searchForm = '.oxd-form';
    table = '.oxd-table';
    tableHeader = '.oxd-table-header';
    tableBody = '.oxd-table-body';
    employeeIdInput = '.oxd-input';
    addButton = 'button';
    submitButton = 'button[type="submit"]';
    resetButton = 'button[type="reset"]';
    
    // Add Employee form selectors
    firstNameInput = 'input[name="firstName"]';
    middleNameInput = 'input[name="middleName"]';
    lastNameInput = 'input[name="lastName"]';
    employeeIdField = '.oxd-input';
    createLoginDetailsSwitch = '.oxd-switch-input';
    usernameInput = '.oxd-input';
    passwordInput = '.oxd-input';
    confirmPasswordInput = '.oxd-input';
    
    // Actions
    verifyEmployeeInformationSectionVisible() {
        cy.contains(this.pageTitle, 'Employee Information').should('be.visible');
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
        cy.contains('.oxd-table-header-cell', 'Id').should('be.visible');
        cy.contains('.oxd-table-header-cell', 'First Name').should('be.visible');
        cy.contains('.oxd-table-header-cell', 'Last Name').should('be.visible');
        cy.contains('.oxd-table-header-cell', 'Job Title').should('be.visible');
        cy.contains('.oxd-table-header-cell', 'Employment Status').should('be.visible');
        return this;
    }
    
    searchForEmployee(employeeId) {
        // Enter employee ID in the ID field (index 1 because there are multiple inputs)
        cy.get(this.employeeIdInput).eq(1).type(employeeId);
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
        cy.contains(this.addButton, 'Add').click();
        return this;
    }
    
    verifySearchResults() {
        cy.get(this.tableBody).should('be.visible');
        return this;
    }
    
    // Add Employee page actions
    verifyAddEmployeePage() {
        cy.contains('.oxd-text--h6', 'Add Employee').should('be.visible');
        cy.contains('.oxd-label', 'First Name').should('be.visible');
        cy.contains('.oxd-label', 'Middle Name').should('be.visible');
        cy.contains('.oxd-label', 'Last Name').should('be.visible');
        cy.contains('.oxd-label', 'Employee Id').should('be.visible');
        return this;
    }
    
    fillEmployeeDetails(firstName, middleName, lastName) {
        cy.get(this.firstNameInput).type(firstName);
        cy.get(this.middleNameInput).type(middleName);
        cy.get(this.lastNameInput).type(lastName);
        return this;
    }
    
    toggleCreateLoginDetails() {
        cy.get(this.createLoginDetailsSwitch).click();
        return this;
    }
    
    fillLoginDetails(username, password, confirmPassword) {
        // Username is the 5th input field (index 4)
        cy.get(this.usernameInput).eq(4).clear().type(username);
        // Password is the 6th input field (index 5)
        cy.get(this.passwordInput).eq(5).type(password);
        // Confirm Password is the 7th input field (index 6)
        cy.get(this.confirmPasswordInput).eq(6).type(confirmPassword);
        return this;
    }
    
    verifyEmployeeDetailsEntered(firstName, middleName, lastName) {
        cy.get(this.firstNameInput).should('have.value', firstName);
        cy.get(this.middleNameInput).should('have.value', middleName);
        cy.get(this.lastNameInput).should('have.value', lastName);
        return this;
    }
}

export default new PIMPage();