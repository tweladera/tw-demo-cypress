Feature: Logout and Session Management
  As an authenticated HR system user
  I want to log out securely and have my session properly terminated
  So that my account cannot be accessed by unauthorized users after I leave

  Background:
    Given the user is authenticated in OrangeHRM

  # ─── Happy Path ───────────────────────────────────────────────────────────────

  @happy @smoke
  Scenario: User dropdown menu displays a Logout option
    When the user clicks the profile/user dropdown in the top navigation
    Then the dropdown menu opens
    And a "Logout" option is visible

  @happy @smoke
  Scenario: User logs out successfully and is redirected to the login page
    When the user opens the user dropdown and clicks "Logout"
    Then the user is redirected to the login page
    And the login form is visible with username and password fields

  @happy @smoke
  Scenario: Accessing a protected page after logout redirects to login
    Given the user has just logged out
    When the user navigates to the Dashboard URL directly
    Then the application redirects to the login page
    And no Dashboard content is rendered before the redirect

  # ─── Boundary ─────────────────────────────────────────────────────────────────

  @boundary
  Scenario: Logout from any module (not just Dashboard) works correctly
    Given the user has navigated to the PIM module
    When the user opens the dropdown and clicks "Logout"
    Then the user is redirected to the login page regardless of the current module

  @boundary
  Scenario: Browser back button after logout does not restore authenticated page
    Given the user has logged out
    When the user presses the browser back button
    Then either the login page is shown or the browser cache version of the page is non-functional
    And any API calls from that cached page return 401 or redirect to login

  # ─── Error & Failure Modes ────────────────────────────────────────────────────

  @error
  Scenario: Logout is still possible when the server returns a slow response
    Given the server is experiencing high latency
    When the user clicks Logout
    Then the logout eventually completes within an acceptable timeout
    And the user lands on the login page — not an error page

  # ─── Security ─────────────────────────────────────────────────────────────────

  @security
  Scenario: Session cookie is invalidated after logout
    When the user logs out
    Then the session cookie is cleared from the browser
    And a direct API call using the old session token returns 401 Unauthorized

  @security
  Scenario: Concurrent session is invalidated when user logs out on one device
    Given the user is logged in from two different browser sessions
    When the user logs out from session A
    Then session B returns a 401 or redirects to login on the next request

  @security
  Scenario: CSRF token is refreshed after logout to prevent token reuse
    Given the user has logged out
    When a form submission is attempted using the pre-logout CSRF token
    Then the server rejects the request with a CSRF validation error

  # ─── State & Concurrency ──────────────────────────────────────────────────────

  @state
  Scenario: Double-clicking Logout does not cause errors
    When the user double-clicks the "Logout" option
    Then the user is redirected to the login page exactly once
    And no error or duplicate logout request occurs

  @state
  Scenario: Logout clears all in-memory application state
    Given the user had unsaved changes in a form
    When the user logs out and logs back in
    Then the previous unsaved changes are not present

  # ─── Contract ─────────────────────────────────────────────────────────────────

  @contract
  Scenario: Logout API call receives a successful response before redirect
    When the user initiates logout
    Then the logout API call returns a 2xx status
    And the application then redirects to the login page

  @contract
  Scenario: Protected API endpoints return 401 after the session is terminated
    Given the user has logged out
    When any OrangeHRM API endpoint is called with the old session
    Then the response status is 401 Unauthorized
    And the body does not contain any user data
