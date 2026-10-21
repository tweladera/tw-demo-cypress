Feature: Leave Management
  As an HR system user
  I want to view, apply for, and manage leave requests
  So that I can track and control employee time off

  Background:
    Given the user is authenticated in OrangeHRM
    And the user has navigated to the Leave module

  # ─── Happy Path ───────────────────────────────────────────────────────────────

  @happy @smoke
  Scenario: Leave List page is displayed after navigating to Leave module
    Then the page heading reads "Leave List"
    And a table of leave requests is visible

  @happy @smoke
  Scenario: Employee with leave balance can view the Apply Leave form
    Given the authenticated user has leave entitlements assigned
    When the user navigates to "Apply" in the Leave module
    Then the Apply Leave form is displayed with URL containing "/applyLeave"
    And the form shows "Leave Type", "From Date", and "To Date" fields

  @happy @smoke
  Scenario: Employee successfully submits a leave request
    Given the authenticated user has at least one leave type with available balance
    When the user navigates to "Apply" in the Leave module
    And selects a leave type from the dropdown
    And enters a valid from date and to date for a future period
    And optionally adds a comment
    And clicks the "Apply" button
    Then a success notification is displayed
    And the new leave request appears in the Leave List with status "Pending"

  @happy
  Scenario: User can view their own leave history on My Leave page
    When the user navigates to "My Leave" in the Leave module
    Then a list of the current user's leave requests is displayed
    And each entry shows the leave type, dates, and status

  # ─── Boundary ─────────────────────────────────────────────────────────────────

  @boundary
  Scenario: Leave request with same from date and to date (single day) is accepted
    Given the user has leave balance available
    When the user applies for leave with from date equal to to date
    Then the request is submitted successfully for one day

  @boundary
  Scenario: Apply Leave form submitted without selecting a leave type shows validation error
    Given the user is on the Apply Leave form
    When the user clicks Apply without selecting a Leave Type
    Then a required-field validation error is shown for Leave Type

  @boundary
  Scenario Outline: Apply Leave date range boundary validation
    Given the user is on the Apply Leave form with a leave type selected
    When the user sets From Date to "<from_date>" and To Date to "<to_date>"
    And clicks Apply
    Then the system shows "<expected_outcome>"
    Examples:
      | from_date   | to_date     | expected_outcome                           |
      | 2027-01-15  | 2027-01-14  | Validation error: To Date before From Date |
      | (past date) | (past date) | Validation error or rejection for past dates |
      | 2027-01-15  | 2027-01-15  | Submission accepted for one day            |

  # ─── Error & Failure Modes ────────────────────────────────────────────────────

  @error
  Scenario: Admin user with no leave entitlements sees informational message on Apply Leave
    Given the authenticated user has no leave types with available balance
    When the user navigates to the Apply Leave form
    Then the message "No Leave Types with Leave Balance" is displayed
    And the apply form fields are not shown

  @error
  Scenario: Applying for leave on a non-working day or public holiday shows an error
    Given the user has leave balance available
    When the user applies for leave on a date marked as a public holiday
    Then the system rejects the request with an appropriate validation message

  @error
  Scenario: Leave request exceeding available balance is rejected
    Given the user has 2 days of annual leave remaining
    When the user applies for 5 days of annual leave
    Then the system displays an insufficient balance error
    And the request is not submitted

  # ─── Security ─────────────────────────────────────────────────────────────────

  @security
  Scenario: Unauthenticated user cannot access the Leave module
    Given the user is not logged in
    When the user navigates directly to the Leave List URL
    Then the application redirects to the login page

  @security
  Scenario: Regular employee cannot access another employee's leave details directly
    Given user A is a regular employee
    When user A navigates to user B's leave record URL by manipulating the URL
    Then the application returns an authorization error or redirects to a safe page

  @security
  Scenario: Manager can view direct reports' leave requests
    Given the authenticated user has the Manager role
    When the user views the Leave List
    Then leave requests from their direct reports are visible

  # ─── State & Concurrency ──────────────────────────────────────────────────────

  @state
  Scenario: Duplicate leave request for the same dates is handled gracefully
    Given the user has an existing pending leave request for 2027-01-15
    When the user submits another leave request for the same dates
    Then the system either rejects the duplicate or prompts the user to review the conflict
    And the leave balance is not decremented twice

  @state
  Scenario: Cancelling a pending leave request restores the leave balance
    Given the user has a pending leave request consuming 2 days of balance
    When the user cancels the pending leave request
    Then the leave balance is restored by 2 days
    And the request status changes to "Cancelled"

  @state
  Scenario: Leave request that is rejected by manager does not consume leave balance
    Given the user has a pending leave request
    When the manager rejects the request
    Then the employee's leave balance is unchanged
    And the leave status is updated to "Rejected"

  # ─── Contract ─────────────────────────────────────────────────────────────────

  @contract
  Scenario: Leave API returns proper error structure for invalid requests
    When a leave request is submitted with missing required fields
    Then the API returns a 4xx status with a structured error body
    And the error message identifies the missing field

  @contract
  Scenario: Leave List renders correctly with zero leave records
    Given the leave list has no records for the current filter
    Then the table is shown in an empty state — not a broken layout or JS error
