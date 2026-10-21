Feature: User Authentication
  As an HR system user
  I want to log in to OrangeHRM with my credentials
  So that I can access HR management features

  Background:
    Given the user is on the OrangeHRM login page

  # ─── Happy Path ───────────────────────────────────────────────────────────────

  @happy @smoke
  Scenario: Successful login with valid credentials
    Given the login page is fully loaded with logo and form visible
    When the user enters valid username and password
    And clicks the Login button
    Then the user is redirected to the Dashboard
    And the Dashboard header displays "Dashboard"

  @happy
  Scenario: Login page displays all required elements
    Then the company logo is visible
    And the login form has a username field, a password field, and a Login button
    And the page title reads "Login"

  @happy
  Scenario: Forgot password link navigates to reset password page
    When the user clicks "Forgot your password?"
    Then the URL includes "/auth/requestPasswordResetCode"
    And the page heading reads "Reset Password"
    And instructional text beginning with "Please" is visible

  # ─── Boundary ─────────────────────────────────────────────────────────────────

  @boundary
  Scenario Outline: Login field validation with boundary inputs
    When the user enters "<username>" as username and "<password>" as password
    And clicks the Login button
    Then the system shows "<expected_outcome>"
    Examples:
      | username | password   | expected_outcome              |
      |          |            | Required field errors × 2     |
      | admin    |            | Required field error on password |
      |          | admin123   | Required field error on username |
      | admin    | wrongpass  | Invalid credentials alert     |

  @boundary
  Scenario: Username field accepts maximum length input without crashing
    When the user enters a username of 255 characters
    And clicks the Login button
    Then the system responds with either an error message or a redirect — not a 500 error

  # ─── Error & Failure Modes ────────────────────────────────────────────────────

  @error @smoke
  Scenario: Invalid credentials show a clear error message
    When the user enters an incorrect username or password
    And clicks the Login button
    Then an alert with "Invalid credentials" is visible
    And the user remains on the login page

  @error
  Scenario: Empty form submission shows required field errors
    When the user clicks the Login button without entering any credentials
    Then two required-field validation messages are displayed
    And no network request to the authentication endpoint is made

  # ─── Security ─────────────────────────────────────────────────────────────────

  @security
  Scenario: Unauthenticated access to dashboard redirects to login
    Given the user is not logged in
    When the user navigates directly to "/dashboard/index"
    Then the application redirects to the login page
    And no dashboard content is shown before the redirect

  @security
  Scenario: SQL injection payload in username field does not crash the server
    When the user enters "' OR '1'='1" as the username
    And enters any value as the password and clicks Login
    Then the system returns an invalid credentials error
    And the response status is not 500

  @security
  Scenario: XSS payload in username field is not executed
    When the user enters "<script>alert('xss')</script>" as the username
    And clicks the Login button
    Then the script is not executed
    And the field value is displayed as escaped text or the field is rejected

  # ─── State & Concurrency ──────────────────────────────────────────────────────

  @state
  Scenario: Already-authenticated user visiting login page is redirected
    Given the user is already logged in
    When the user navigates to the login page URL
    Then the application redirects to the Dashboard
    And the login form is not shown

  @state
  Scenario: Session expires after inactivity — access to protected page prompts re-login
    Given the user was authenticated but their session has expired
    When the user attempts to access a protected page
    Then the application redirects to the login page
    And a session expiry indicator or message is shown

  # ─── Password Reset ──────────────────────────────────────────────────────────

  @happy @smoke
  Scenario: Password reset request submitted with valid username shows confirmation
    Given the user is on the Reset Password page
    When the user enters a valid username and clicks "Reset Password"
    Then the URL changes to "/auth/requestResetPassword"
    And a confirmation page or message is shown

  @error
  Scenario: Password reset with empty username shows required field error
    Given the user is on the Reset Password page
    When the user clicks "Reset Password" without entering a username
    Then a required-field validation message is displayed
    And no reset email request is sent

  # ─── Contract ─────────────────────────────────────────────────────────────────

  @contract
  Scenario: Login API endpoint returns structured error for invalid credentials
    When the user submits invalid credentials
    Then the authentication API returns a 4xx status code
    And the response body contains an error message — not a generic server error

  @contract
  Scenario: Login page loads correctly when served over HTTPS
    Given the application is accessed over a secure connection
    Then the login page renders without mixed-content warnings
    And form fields are functional
