class NavigationComponent {
    // Selectors
    mainMenu = '.oxd-main-menu';
    topbarHeader = '.oxd-topbar-header';
    topbarBodyNav = '.oxd-topbar-body-nav';
    
    // Main menu items
    getMainMenuItem(name) {
        return cy.contains('.oxd-main-menu-item', name);
    }
    
    // Topbar navigation items
    getTopbarNavItem(name) {
        return cy.contains('.oxd-topbar-body-nav-tab-item', name);
    }
    
    getTopbarNavLink(name) {
        return cy.contains('.oxd-topbar-body-nav-tab-link', name);
    }
    
    // Actions
    navigateToMainMenuItem(name) {
        this.getMainMenuItem(name).click();
        cy.get(this.topbarHeader).should('contain', name);
        return this;
    }
    
    navigateToAdmin() {
        return this.navigateToMainMenuItem('Admin');
    }
    
    navigateToPIM() {
        return this.navigateToMainMenuItem('PIM');
    }

    navigateToLeave() {
        return this.navigateToMainMenuItem('Leave');
    }

    navigateToApplyLeave() {
        // "Apply" is a top-level nav item in Leave, not a sub-link
        this.clickTopbarNavItem('Apply');
        return this;
    }
    
    // Topbar navigation actions
    clickTopbarNavItem(name) {
        this.getTopbarNavItem(name).click();
        return this;
    }
    
    clickTopbarNavLink(name) {
        this.getTopbarNavLink(name).click();
        return this;
    }
    
    // Combined navigation actions
    navigateToJobTitles() {
        this.clickTopbarNavItem('Job');
        this.clickTopbarNavLink('Job Titles');
        return this;
    }
    
    navigateToGeneralInformation() {
        this.clickTopbarNavItem('Organization');
        this.clickTopbarNavLink('General Information');
        return this;
    }
    
    navigateToSkills() {
        this.clickTopbarNavItem('Qualifications');
        this.clickTopbarNavLink('Skills');
        return this;
    }
    
    navigateToReports() {
        this.clickTopbarNavItem('Reports');
        return this;
    }
    
    navigateToCustomFields() {
        this.clickTopbarNavItem('Configuration');
        this.clickTopbarNavLink('Custom Fields');
        return this;
    }
}

export default new NavigationComponent();