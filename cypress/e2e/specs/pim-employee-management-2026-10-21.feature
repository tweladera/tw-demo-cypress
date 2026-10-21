Feature: PIM Employee Management
  As an HR administrator
  I want to search, add, view, and edit employee records
  So that I can maintain accurate personnel information

  Background:
    Given the user is authenticated with admin or PIM access
    And the user has navigated to PIM > Employee List

  # ─── Happy Path ───────────────────────────────────────────────────────────────

  @happy @smoke
  Scenario: Employee List page displays with correct headings and table
    Then the page heading reads "Employee Information"
    And the search form is visible
    And the results table shows columns: Id, First Name, Last Name, Job Title, Employment Status, Sub Unit, Actions

  @happy @smoke
  Scenario: Searching for an employee by ID returns matching results
    When the user enters employee ID "0001" in the Employee Id search field
    And clicks the Search button
    Then the results table shows employees matching the given ID

  @happy
  Scenario: Resetting the search form clears all filters
    Given the user has entered employee search criteria
    When the user clicks the Reset button
    Then all search fields are cleared
    And the full employee list is shown

  @happy @smoke
  Scenario: Admin navigates to Add Employee page
    When the user clicks the "Add" button
    Then the Add Employee form is displayed with heading "Add Employee"
    And the form contains fields: First Name, Middle Name, Last Name, Employee Id

  @happy
  Scenario: Admin fills out Add Employee form fields correctly
    Given the user is on the Add Employee page
    When the user enters a first name, middle name, and last name
    Then the values are reflected in the corresponding form fields

  @happy
  Scenario: Admin can view and edit an existing employee's personal details
    Given an employee record exists in the system
    When the user clicks on the employee's name or edit action in the list
    Then the employee's personal details page is displayed
    And editable fields include First Name, Last Name, Date of Birth, Gender, and Nationality

  @happy
  Scenario: Admin successfully updates an employee's personal details
    Given the user is viewing an employee's personal details page
    When the user changes the employee's middle name and clicks Save
    Then a success notification is shown
    And the updated middle name is reflected when the page is reloaded

  # ─── Boundary ─────────────────────────────────────────────────────────────────

  @boundary
  Scenario: Searching with no criteria returns all employees
    When the user clicks Search without entering any filter criteria
    Then the full employee list is returned
    And results are paginated if there are more than the default page size

  @boundary
  Scenario: Searching for a non-existent employee ID returns an empty table
    When the user enters an employee ID that does not exist and clicks Search
    Then the table shows an empty state without an error

  @boundary
  Scenario Outline: Add Employee form field length validation
    Given the user is on the Add Employee form
    When the user enters "<value>" in the "<field>" field and submits
    Then the system shows "<expected_outcome>"
    Examples:
      | field       | value              | expected_outcome                     |
      | First Name  | (empty)            | Required field validation error      |
      | Last Name   | (empty)            | Required field validation error      |
      | First Name  | (100-char string)  | Accepted or max-length error         |

  # ─── Error & Failure Modes ────────────────────────────────────────────────────

  @error
  Scenario: Add Employee form submitted without First Name or Last Name shows validation errors
    Given the user is on the Add Employee form
    When the user clicks Save without entering First Name and Last Name
    Then required-field errors are displayed for those fields

  @error
  Scenario: Creating login details with mismatched passwords shows an error
    Given the user is on the Add Employee form with "Create Login Details" toggled on
    When the user enters different values for Password and Confirm Password
    And clicks Save
    Then a passwords-do-not-match validation error is shown
    And the employee record is not created

  @error
  Scenario: Duplicate Employee ID is rejected with a clear error message
    Given employee ID "12345" is already assigned to another employee
    When the user attempts to create a new employee with ID "12345"
    Then the system displays an error indicating the ID is already in use

  # ─── Security ─────────────────────────────────────────────────────────────────

  @security
  Scenario: ESS employee cannot access another employee's personal details
    Given the user is authenticated with ESS (Employee Self Service) role
    When the user navigates directly to another employee's personal details URL
    Then the system returns an authorization error or redirects to their own profile

  @security
  Scenario: Unauthenticated user cannot access PIM Employee List
    Given the user is not logged in
    When the user navigates to the PIM Employee List URL
    Then the application redirects to the login page

  @security
  Scenario: XSS payload in employee name search field is sanitized
    When the user enters "<img src=x onerror=alert(1)>" in the Employee Name search field
    And clicks Search
    Then no script executes and the input is displayed as escaped text or rejected

  # ─── State & Concurrency ──────────────────────────────────────────────────────

  @state
  Scenario: Deleting an employee removes them from the Employee List
    Given an employee record exists that is not linked to active system user accounts
    When the admin selects the employee and clicks Delete
    And confirms the deletion
    Then the employee no longer appears in the Employee List
    And associated personal data is removed or archived per retention policy

  @state
  Scenario: Editing an employee record while another admin views it shows updated data
    Given admin A and admin B are both viewing the same employee record
    When admin A saves changes to the employee's job title
    Then admin B sees the updated job title on the next page load

  @state
  Scenario: Employee record with active leave requests cannot be deleted without warning
    Given an employee has pending leave requests
    When an admin attempts to delete that employee record
    Then the system warns about dependent data and requires explicit confirmation

  # ─── Contract ─────────────────────────────────────────────────────────────────

  @contract
  Scenario: Employee creation API returns the new employee ID in the response
    When a valid Add Employee form is submitted
    Then the API response includes the newly assigned Employee Id
    And the employee appears in the list without requiring a manual search

  @contract
  Scenario: Employee list API returns consistent pagination metadata
    When the employee list is requested with a page size parameter
    Then the response includes total record count and current page information
    And navigating to the next page returns a non-overlapping result set
