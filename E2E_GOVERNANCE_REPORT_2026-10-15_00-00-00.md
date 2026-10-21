# E2E Test Governance Report

**Generated:** 2026-10-15 00:00:00
**Skill:** /tw-e2e-test-governor | v0.3.0
**Framework:** Cypress
**Project:** tw-demo-cypress
**Base URL:** https://opensource-demo.orangehrmlive.com/web/index.php
**Spec Pattern:** cypress/e2e/**/*.cy.js (auto-detected)

---

## Executive Summary

| Metric | Value |
|---|---|
| E2E test files | 5 |
| Total scenarios | 27 |
| Critical flows with coverage | 2 / 7 (29%) |
| High flows with coverage | 2 / 6 (33%) |
| Feature files without E2E tests | N/A (no .feature files exist) |
| data-testid selectors used | 0 |
| CSS class selectors (fragile) | 40+ |
| Index-based selectors (very fragile) | 5 |
| Hardcoded waits | 0 |
| **Overall decision** | **CREATE TESTS + FIX SELECTORS** |
| **Primary risk** | Zero use of data-testid or ARIA selectors across all POMs and tests — the entire suite is coupled to OXD design-system class names that can change at any framework version bump, plus 5 index-based `.eq(N)` calls that will silently break on any layout change. |

---

## Feature Coverage Matrix

No `.feature` files exist in this project (`specs/` and `features/` directories are absent).
This means there is no spec-first layer to cross-reference.

**Recommendation:** Run `/tw-exec-spec-generator` to generate Gherkin feature files for
all critical user flows, then use `/tw-e2e-spec-to-test` to convert them to Cypress tests.

---

## Flow Coverage Matrix

### OrangeHRM Web Application Flows

| User Flow | Route | Priority | Test File | Scenarios | Status | Action |
|---|---|---|---|---|---|---|
| User login (valid credentials) | /auth/login | CRITICAL | orangehrm-login.cy.js | 3 | COVERED | — |
| User login (invalid / validation) | /auth/login | CRITICAL | orangehrm-login.cy.js | 2 | COVERED | — |
| User logout | /auth/logout | CRITICAL | — | 0 | MISSING | create-test |
| Password reset (full flow) | /auth/requestPasswordResetCode | CRITICAL | orangehrm-login.cy.js | 1 (nav only) | PARTIAL | extend-test |
| Dashboard overview | /dashboard/index | CRITICAL | orangehrm-navigation.cy.js | 1 | COVERED | — |
| Admin – view system users | /viewSystemUser | HIGH | orangehrm-admin.cy.js | 2 | COVERED | — |
| Admin – create user (end-to-end) | /saveSystemUser | HIGH | orangehrm-admin.cy.js | 1 (nav only) | PARTIAL | extend-test |
| Admin – edit user | /viewSystemUser/:id | HIGH | — | 0 | MISSING | create-test |
| Admin – delete user | /viewSystemUser | HIGH | — | 0 | MISSING | create-test |
| PIM – employee list & search | /viewEmployeeList | HIGH | orangehrm-pim.cy.js | 3 | COVERED | — |
| PIM – add employee (end-to-end) | /addEmployee | HIGH | orangehrm-pim.cy.js | 2 (form filled, not saved) | PARTIAL | extend-test |
| PIM – edit employee | /viewPersonalDetails/:id | HIGH | — | 0 | MISSING | create-test |
| Leave – apply for leave | /applyLeave | CRITICAL | — | 0 | MISSING | create-test |
| Leave – approve leave (manager) | /viewLeaveList | CRITICAL | — | 0 | MISSING | create-test |
| Time – add attendance record | /addAttendanceRecord | HIGH | — | 0 | MISSING | create-test |
| Performance – my trackers | /myPerformanceTracker | HIGH | — | 0 | MISSING | create-test |
| Recruitment – job vacancies | /viewJobVacancy | MEDIUM | — | 0 | MISSING | create-test |
| My Info – personal details | /viewPersonalDetails | MEDIUM | — | 0 | MISSING | create-test |
| Reports – employee reports | /viewEmployeeReports | MEDIUM | orangehrm-pim.cy.js | 1 (nav only) | PARTIAL | extend-test |
| Admin – Job Titles | /viewJobTitleList | MEDIUM | orangehrm-admin.cy.js | 1 (nav only) | PARTIAL | extend-test |
| Admin – Organization info | /viewOrganizationGeneralInformation | MEDIUM | orangehrm-admin.cy.js | 1 (nav only) | PARTIAL | extend-test |
| Admin – Qualifications/Skills | /viewSkills | LOW | orangehrm-admin.cy.js | 1 (nav only) | PARTIAL | extend-test |
| Admin – PIM Custom Fields | /viewCustomFields | LOW | orangehrm-pim.cy.js | 1 (nav only) | PARTIAL | — |
| Buzz (social feed) | /buzz | LOW | — | 0 | MISSING | low-priority |
| Claims module | /viewClaimRequest | LOW | — | 0 | MISSING | low-priority |

### Pokemon API Flows

| User Flow | Endpoint | Priority | Test File | Scenarios | Status |
|---|---|---|---|---|---|
| GET ability by ID | /ability/:id | HIGH | pokemon-api.cy.js | 1 | COVERED |
| GET non-existent ability (404) | /ability/9999 | HIGH | pokemon-api.cy.js | 1 | COVERED |
| GET Pokemon by ID | /pokemon/:id | HIGH | pokemon-api.cy.js | 1 | COVERED |
| GET abilities with pagination | /ability?limit&offset | MEDIUM | pokemon-api.cy.js | 1 | COVERED |
| GET type by ID | /type/:id | MEDIUM | pokemon-api.cy.js | 1 | COVERED |
| GET invalid endpoint (400) | /invalid_endpoint | MEDIUM | pokemon-api.cy.js | 1 | COVERED |
| POST / PUT / DELETE operations | various | LOW | — | 0 | MISSING (read-only API) |

---

## Test Health Report

### Critical — Index-based Selectors (break silently on DOM reorder)

| File | Line | Selector | Risk | Recommendation |
|---|---|---|---|---|
| PIMPage.js | 99 | `cy.get('.oxd-input').eq(4)` (username in add-employee form) | CRITICAL | Add `data-testid="username-input"` to the component; use `cy.getByTestId('username-input')` |
| PIMPage.js | 101 | `cy.get('.oxd-input').eq(5)` (password in add-employee form) | CRITICAL | Add `data-testid="password-input"`; use `cy.getByTestId('password-input')` |
| PIMPage.js | 103 | `cy.get('.oxd-input').eq(6)` (confirm password in add-employee form) | CRITICAL | Add `data-testid="confirm-password-input"` |
| AdminPage.js | 41 | `cy.get('.oxd-input').eq(1)` (username search field) | HIGH | Add `data-testid="search-username"` |
| PIMPage.js | 51 | `cy.get('.oxd-input').eq(1)` (employee ID search field) | HIGH | Add `data-testid="search-employee-id"` |

### High — Generic CSS Class Selectors (coupled to design-system internals)

| File | Selector | Risk | Recommendation |
|---|---|---|---|
| AdminPage.js | `.oxd-button--secondary` | HIGH | Use `data-testid="add-user-btn"` or `cy.contains('button', 'Add')` |
| AdminPage.js | `.oxd-select-text` (used for role + status dropdowns via `.eq()`) | HIGH | Add `data-testid` per dropdown |
| DashboardPage.js | `.oxd-glass-button` + `.should('contain', 'U')` | HIGH | User initial 'U' is user-specific — assertion will break for different users. Use `data-testid="user-avatar"` |
| LoginPage.js | `.orangehrm-login-title`, `.orangehrm-login-branding`, `.orangehrm-login-forgot-header` | MEDIUM | Acceptable if OrangeHRM doesn't expose testids; document as external-site limitation |
| LoginPage.js | `.oxd-alert-content`, `.oxd-input-field-error-message` | MEDIUM | Acceptable; document as external-site limitation |
| orangehrm-login.cy.js:68-69 | `.orangehrm-forgot-password-title`, `.orangehrm-card-note > .oxd-text` | MEDIUM | Move into LoginPage POM; flag as external-site risk |
| NavigationComponent.js | All selectors (`.oxd-main-menu-item`, `.oxd-topbar-body-nav-tab-item`, `.oxd-topbar-body-nav-tab-link`) | MEDIUM | Acceptable for navigation since the demo site provides no testids; document rationale |
| PIMPage.js | `addButton = 'button'` (bare element selector) | HIGH | Use `cy.contains('button', 'Add')` pattern already in clickAdd(), or add testid |

### Medium — Assertions Leaking Out of POM Layer

| File | Location | Issue | Recommendation |
|---|---|---|---|
| orangehrm-login.cy.js | Lines 68-69 | Raw `cy.get()` calls on forgot-password page exist in the test file, bypassing POM | Move assertions into `LoginPage.verifyForgotPasswordPage()` |
| orangehrm-admin.cy.js | Lines 51, 58-63, 66-70 | Raw `cy.contains()` calls mixed with POM usage | Extract into `AdminPage` and `NavigationComponent` assertion methods |
| orangehrm-pim.cy.js | Lines 35, 74 | Raw `cy.get()` and `cy.contains()` calls in test body | Extract into `PIMPage` assertion methods |

### Low — Missing cy.intercept / Network Waits

| File | Flow | Issue | Recommendation |
|---|---|---|---|
| orangehrm-admin.cy.js | Search flow | No `cy.intercept()` alias for the search API response — relies on `defaultCommandTimeout: 10000` | Add `cy.intercept('GET', '**/viewSystemUser*').as('searchUsers')` then `cy.wait('@searchUsers')` |
| orangehrm-pim.cy.js | Search flow | Same issue — search submission not awaited via intercept | Add intercept alias for employee list API |

---

## Gaps by Priority

### CRITICAL — Must fix before any release

1. **Logout flow has zero coverage.** A user cannot be confirmed to log out successfully.
   Action: Create `orangehrm-logout.cy.js`.

2. **Leave module has zero coverage.** Apply and approve leave are core HR workflows.
   Action: Create `orangehrm-leave.cy.js` with apply and approve scenarios.

3. **Password reset flow is incomplete.** Only navigation to the reset page is tested — the
   actual code entry, new password, and confirmation flow is untested.
   Action: Extend `orangehrm-login.cy.js` or create `orangehrm-password-reset.cy.js`.

4. **5 index-based `.eq(N)` selectors.** These will produce hard-to-diagnose failures when
   any new input field is added to a form. See Test Health Report above.

### HIGH — Fix in current sprint

5. **Admin create/edit/delete user** — only "navigate to Add User page" is tested. The save
   operation and confirmation are not exercised. Extend `orangehrm-admin.cy.js`.

6. **PIM add employee** — form is filled but `Save` is never clicked. The PIM add-employee
   test explicitly avoids saving ("to avoid modifying demo data") — document this as an
   accepted limitation or use a teardown strategy via the OrangeHRM API.

7. **PIM edit employee** — navigate to an employee's detail page and verify editable fields.
   No test exists for this flow.

8. **Time module** — no coverage at all.

9. **Performance module** — no coverage at all.

10. **`.oxd-button--secondary`** and **`addButton = 'button'`** generic selectors —
    replace with more specific targeting (see Test Health Report).

11. **DashboardPage widget assertion `'U'`** — user-initial-dependent assertion will fail
    for any user whose name doesn't start with 'U'. Replace with role-based assertion.

### MEDIUM — Plan for next sprint

12. **Navigation-only tests** (Job Titles, Organization, Skills, Reports, Custom Fields) —
    these tests only verify that a page loads after clicking a menu item. They should be
    extended to verify at least one piece of meaningful content on each page.

13. **My Info / Profile** — no coverage. Common source of regressions after permission changes.

14. **Recruitment module** — no coverage.

15. **Raw `cy.get()` calls in test bodies** leaking out of the POM layer — extract into POM
    methods to maintain the architecture already established in this project.

16. **No `cy.intercept()` network waits** in search flows — adds implicit test fragility
    when the network is slow.

17. **No `.feature` files** — spec-first layer is absent. Consider introducing Gherkin to
    make acceptance criteria explicit and traceable.

---

## Recommendations

### Priority 1 (CRITICAL — before any release gate)

| # | Action | Skill to invoke |
|---|---|---|
| 1 | Create Logout test (`orangehrm-logout.cy.js`) | `/tw-e2e-spec-to-test` |
| 2 | Create Leave module tests (apply + approve) | `/tw-e2e-spec-to-test` |
| 3 | Extend password reset test to cover full form submission | `/tw-e2e-spec-to-test` |
| 4 | Replace all 5 index-based `.eq(N)` selectors with specific testids or scoped queries | Manual refactor (see Test Health Report) |

### Priority 2 (HIGH — current sprint)

| # | Action | Skill to invoke |
|---|---|---|
| 5 | Extend Admin tests: save new user, edit user, delete user | `/tw-e2e-spec-to-test` |
| 6 | Extend PIM add-employee test to actually save and verify (with cleanup) | `/tw-test-factory` for data setup/teardown |
| 7 | Add PIM edit-employee test | `/tw-e2e-spec-to-test` |
| 8 | Add Time module smoke tests | `/tw-e2e-spec-to-test` |
| 9 | Add Performance module smoke tests | `/tw-e2e-spec-to-test` |
| 10 | Fix `addButton = 'button'` and `.oxd-button--secondary` generic selectors | Manual refactor |
| 11 | Fix DashboardPage `'U'` assertion to use role-agnostic check | Manual refactor |

### Priority 3 (MEDIUM — next sprint)

| # | Action | Skill to invoke |
|---|---|---|
| 12 | Generate Gherkin feature files for all critical flows | `/tw-exec-spec-generator` |
| 13 | Extend navigation-only tests to assert meaningful page content | `/tw-e2e-spec-to-test` |
| 14 | Add My Info and Recruitment module smoke tests | `/tw-e2e-spec-to-test` |
| 15 | Add `cy.intercept()` waits to Admin and PIM search flows | Manual refactor |
| 16 | Extract raw `cy.get()` calls in test bodies into POM assertion methods | `/tw-e2e-page-object` |

---

## Architecture Notes

**Strengths:**
- POM pattern is correctly implemented and consistently used across all 4 OrangeHRM test files.
- Service Object pattern for the Pokemon API is well-structured and appropriately separated.
- Custom commands (`cy.loginWithEnvCredentials`) reduce duplication.
- Environment variable handling for credentials is correct.
- `cypress-mochawesome-reporter` is configured for readable CI output.
- No hardcoded `cy.wait(N)` calls found.

**Weaknesses:**
- Zero `data-testid` or ARIA selectors — entire suite relies on OXD design-system class names.
  Since this tests a third-party demo app, this is partially acceptable, but any internal
  components should use testids.
- 5 index-based `.eq(N)` selectors in PIMPage are the highest-risk items in the suite.
- No `.feature` files means there is no machine-readable acceptance-criteria layer.
- No smoke / regression tag separation (`@smoke`, `@regression`) — all tests run together.
- Pokemon API test uses `cy.api()` (from a plugin) without a visible plugin declaration in
  `cypress/support/e2e.js` — verify the plugin is installed (`cypress-plugin-api` or similar).

---

Would you like me to:
1. Generate tests for CRITICAL gaps (logout, leave, password-reset) with `/tw-e2e-spec-to-test`
2. Generate Gherkin feature files for all flows with `/tw-exec-spec-generator`
3. Generate updated POMs with `data-testid` selectors using `/tw-e2e-page-object`
4. Fix the 5 brittle index-based selectors in `PIMPage.js` and `AdminPage.js` directly
