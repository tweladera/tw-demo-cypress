Feature: Admin User Management
  As an HR system administrator
  I want to create, search, edit, and delete system users
  So that I can control access to OrangeHRM

  Background:
    Given the user is authenticated with the Admin role
    And the user has navigated to Admin > System Users

  # ─── Happy Path ───────────────────────────────────────────────────────────────

  @happy @smoke
  Scenario: Admin page displays System Users section with search form and table
    Then the page heading reads "System Users"
    And the search form is visible with Username, User Role, Employee Name, and Status fields
    And the user table shows columns: Username, User Role, Employee Name, Status, Actions

  @happy @smoke
  Scenario: Searching for a user by username filters the results correctly
    When the admin enters "Admin" in the Username search field
    And selects "Admin" as the User Role
    And selects "Enabled" as the Status
    And clicks the Search button
    Then the results table shows only users matching the search criteria
    And the username "Admin" appears in the results

  @happy @smoke
  Scenario: Admin navigates to Add User form
    When the admin clicks the "Add" button
    Then the Add User form is displayed with URL containing "/saveSystemUser"
    And the form contains fields: User Role, Employee Name, Status, Username, Password, Confirm Password

  @happy
  Scenario: Admin can reset the search form to clear all filters
    Given the admin has entered search criteria
    When the admin clicks the Reset button
    Then all search fields are cleared to their default state
    And the full user list is displayed

  @happy
  Scenario: Admin can navigate to Job section under Admin module
    When the admin clicks "Job" in the top navigation
    And selects "Job Titles"
    Then the page heading reads "Job Titles"

  @happy
  Scenario: Admin can navigate to Organization General Information
    When the admin clicks "Organization" in the top navigation
    And selects "General Information"
    Then the page heading reads "General Information"
    And the "Organization Name" field is present

  # ─── Boundary ─────────────────────────────────────────────────────────────────

  @boundary
  Scenario: Search with no matching results shows empty table — not an error
    When the admin searches for a username that does not exist
    Then the results table is shown in an empty state
    And no error message or JS exception is displayed

  @boundary
  Scenario Outline: Username field boundary values on Add User form
    Given the admin is on the Add User form
    When the admin enters "<username>" in the Username field and submits
    Then the system shows "<expected_outcome>"
    Examples:
      | username | expected_outcome                              |
      |          | Required field validation error               |
      | a        | Minimum length validation error (if enforced) |
      | (40-char string) | User created successfully               |

  # ─── Error & Failure Modes ────────────────────────────────────────────────────

  @error
  Scenario: Add User form submission with missing required fields shows validation errors
    Given the admin is on the Add User form
    When the admin clicks Save without filling any fields
    Then required-field validation errors are shown for User Role, Employee Name, Username, and Password

  @error
  Scenario: Password and Confirm Password mismatch prevents user creation
    Given the admin is filling out the Add User form
    When the admin enters different values in Password and Confirm Password
    And clicks Save
    Then a validation error "Passwords do not match" is displayed
    And the user record is not created

  @error
  Scenario: Creating a user with a duplicate username shows an error
    Given a user with username "existinguser" already exists
    When the admin creates a new user with username "existinguser"
    Then the system displays "Already exists" or a uniqueness error
    And only one user record exists with that username

  # ─── Security ─────────────────────────────────────────────────────────────────

  @security
  Scenario: Non-admin user cannot access the Admin module
    Given the user is authenticated with the ESS (Employee Self Service) role
    When the user navigates directly to the Admin URL
    Then the application returns an authorization error or redirects away from Admin

  @security
  Scenario: Admin cannot create a user with a higher privilege level than their own
    Given the authenticated user is an Admin (not Super Admin)
    When the admin attempts to create a user with Super Admin role
    Then the option is not available or the submission is rejected

  @security
  Scenario: Unauthenticated user cannot access Admin User Management
    Given the user is not logged in
    When the user navigates directly to the Admin System Users URL
    Then the application redirects to the login page

  @security
  Scenario: XSS payload in username search field is sanitized
    When the admin enters "<script>alert(1)</script>" in the Username search field
    And clicks Search
    Then the script is not executed
    And the search field displays the payload as escaped text or rejects it

  # ─── State & Concurrency ──────────────────────────────────────────────────────

  @state
  Scenario: Deleting a user who is currently logged in invalidates their session
    Given user "testuser" is currently authenticated
    When an admin deletes user "testuser"
    Then user "testuser" is redirected to the login page on their next request
    And their session cookie is invalidated

  @state
  Scenario: Disabling a user account prevents them from logging in
    Given user "testuser" has status "Enabled"
    When the admin changes their status to "Disabled"
    Then "testuser" cannot log in
    And receives an appropriate error message

  @state
  Scenario: Editing a user while they are logged in reflects changes on their next page load
    Given user "testuser" is logged in
    When the admin changes "testuser"'s User Role
    Then on the next page navigation, "testuser" operates under the new role

  # ─── Contract ─────────────────────────────────────────────────────────────────

  @contract
  Scenario: User creation API returns a structured response with the new user ID
    When a valid Add User form is submitted
    Then the API response includes the created user's identifier
    And the user appears in the System Users list without a page refresh

  @contract
  Scenario: User list API supports pagination — large result sets do not crash the page
    Given the system has more than 50 users
    When the admin views the System Users list
    Then results are paginated
    And navigation controls are visible and functional
