class LoginPage {
    // Selectors
    usernameInput = 'input[name="username"]';
    passwordInput = 'input[name="password"]';
    loginButton = 'button[type="submit"]';
    loginTitle = '.orangehrm-login-title';
    logo = '.orangehrm-login-branding img';
    forgotPasswordLink = '.orangehrm-login-forgot-header';
    alertContent = '.oxd-alert-content';
    validationError = '.oxd-input-field-error-message';

    // Actions
    visit() {
        cy.visit('/auth/login');
        return this;
    }

    typeUsername(username) {
        cy.get(this.usernameInput).type(username);
        return this;
    }

    typePassword(password) {
        cy.get(this.passwordInput).type(password);
        return this;
    }

    clickLogin() {
        cy.get(this.loginButton).click();
        return this;
    }

    clickForgotPassword() {
        cy.contains(this.forgotPasswordLink, 'Forgot your password?').click();
        return this;
    }

    // Combined actions
    login(username, password) {
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLogin();
        return this;
    }

    // Assertions
    verifyLogoIsVisible() {
        cy.get(this.logo)
            .should('be.visible')
            .and('have.attr', 'src');
        return this;
    }

    verifyLoginTitle(title = 'Login') {
        cy.get(this.loginTitle).should('contain', title);
        return this;
    }

    verifyFormElementsAreVisible() {
        cy.get(this.usernameInput).should('be.visible');
        cy.get(this.passwordInput).should('be.visible');
        cy.get(this.loginButton).should('be.visible');
        return this;
    }

    verifyErrorMessage(message = 'Invalid credentials') {
        cy.get(this.alertContent).should('be.visible');
        cy.get(this.alertContent).should('contain', message);
        return this;
    }

    verifyValidationErrors(count = 2) {
        cy.get(this.validationError).should('have.length', count);
        cy.get(this.validationError).first().should('contain', 'Required');
        return this;
    }

    verifySuccessfulLogin() {
        cy.url().should('include', '/dashboard/index');
        cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
        return this;
    }
}

export default new LoginPage();