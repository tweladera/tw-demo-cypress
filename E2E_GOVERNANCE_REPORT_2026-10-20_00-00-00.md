# E2E Test Governance Report

**Generated:** 2026-10-20 00:00:00
**Skill:** /tw-e2e-test-governor | v0.3.0
**Framework:** Cypress 14 (JavaScript)
**Project:** tw-demo-cypress
**Base URL:** https://opensource-demo.orangehrmlive.com/web/index.php
**Spec Pattern:** `cypress/e2e/**/*.cy.js` (auto-detected)

---

## Executive Summary

| Metric | Value |
|---|---|
| E2E test files | 8 (7 UI + 1 API) |
| Total scenarios | 35 (29 UI + 6 API) |
| Critical flows with coverage | 6 / 10 (60%) |
| High flows with coverage | 6 / 14 (43%) |
| Feature files without E2E tests | N/A — no `.feature` files exist |
| `data-testid` selectors used | 0 — ZERO across entire suite |
| CSS class selectors (fragile) | 40+ |
| Index-based `.eq(N)` selectors | 3 |
| Hardcoded `cy.wait(N)` calls | 0 |
| **Overall decision** | **CREATE TESTS + FIX SELECTORS** |
| **Primary risk** | Zero `data-testid` or ARIA selectors across all POMs — entire suite is coupled to OXD design-system class names (`oxd-*`) that can break with any UI framework update. Additionally, PIMPage.js has a critical selector collision where 4 different fields all resolve to `.oxd-input`. |

---

## What Changed Since Last Report

The previous report (2026-10-15) flagged logout, leave, and password reset as MISSING.
These have now been implemented as new test files. Coverage improved from 29% → 60% on CRITICAL flows.

| New File | Scenarios Added | Status |
|---|---|---|
| `orangehrm-logout.cy.js` | 3 (dropdown visible, logout success, session protection) | COVERED |
| `orangehrm-password-reset.cy.js` | 3 (form display, submission, empty validation) | COVERED |
| `orangehrm-leave.cy.js` | 3 (list page, apply form, no-balance state) | PARTIAL |

---

## Feature Coverage Matrix

No `.feature` files exist in `specs/`, `features/`, or any subdirectory.
There is no Gherkin/BDD layer — test intent lives only in `describe`/`it` strings.

**Recommendation:** Run `/tw-exec-spec-generator` to generate Gherkin feature files for all flows,
then `/tw-e2e-spec-to-test` to sync tests against specs.

---

## Flow Coverage Matrix

### OrangeHRM Web Application — UI Flows

| User Flow | Route (relative to baseUrl) | Priority | Test File | Status | Action |
|---|---|---|---|---|---|
| Login — valid credentials (env vars) | /auth/login | CRITICAL | orangehrm-login.cy.js | COVERED | — |
| Login — valid credentials (fixture) | /auth/login | CRITICAL | orangehrm-login.cy.js | COVERED | — |
| Login — invalid credentials | /auth/login | CRITICAL | orangehrm-login.cy.js | COVERED | — |
| Login — required field validation | /auth/login | CRITICAL | orangehrm-login.cy.js | COVERED | — |
| Forgot password — page navigation | /auth/requestPasswordResetCode | CRITICAL | orangehrm-login.cy.js, orangehrm-password-reset.cy.js | COVERED | — |
| Password reset — submission + confirmation | /auth/requestResetPassword | CRITICAL | orangehrm-password-reset.cy.js | COVERED | — |
| Password reset — empty field validation | /auth/requestPasswordResetCode | CRITICAL | orangehrm-password-reset.cy.js | COVERED | — |
| Logout — menu option visible | /dashboard/index | CRITICAL | orangehrm-logout.cy.js | COVERED | — |
| Logout — successful redirect | /auth/login | CRITICAL | orangehrm-logout.cy.js | COVERED | — |
| Session protection after logout | /dashboard/index | CRITICAL | orangehrm-logout.cy.js | COVERED | — |
| Dashboard — display + widgets | /dashboard/index | HIGH | orangehrm-navigation.cy.js | PARTIAL | Extend widget assertions beyond single button |
| Admin — view system users list | /admin/viewSystemUser | HIGH | orangehrm-admin.cy.js | COVERED | — |
| Admin — search users | /admin/viewSystemUser | HIGH | orangehrm-admin.cy.js | COVERED | — |
| Admin — navigate to Add User form | /admin/saveSystemUser | HIGH | orangehrm-admin.cy.js | PARTIAL | Form visible only; no save |
| Admin — create user (end-to-end) | /admin/saveSystemUser | HIGH | — | MISSING | create-test |
| Admin — edit user | /admin/viewSystemUser/:id | HIGH | — | MISSING | create-test |
| Admin — delete user | /admin/viewSystemUser | HIGH | — | MISSING | create-test |
| Admin — Job Titles navigation | /admin/viewJobTitleList | MEDIUM | orangehrm-admin.cy.js | PARTIAL | Navigation only |
| Admin — Organization General Info | /admin/viewOrganizationGeneralInformation | MEDIUM | orangehrm-admin.cy.js | PARTIAL | Navigation only |
| Admin — Skills/Qualifications | /admin/viewSkills | MEDIUM | orangehrm-admin.cy.js | PARTIAL | Navigation only |
| PIM — employee list display | /pim/viewEmployeeList | HIGH | orangehrm-pim.cy.js | COVERED | — |
| PIM — search employee by ID | /pim/viewEmployeeList | HIGH | orangehrm-pim.cy.js | COVERED | — |
| PIM — reset search form | /pim/viewEmployeeList | HIGH | orangehrm-pim.cy.js | COVERED | — |
| PIM — navigate to Add Employee | /pim/addEmployee | HIGH | orangehrm-pim.cy.js | PARTIAL | Form fill only; not saved |
| PIM — edit employee details | /pim/viewPersonalDetails/:id | HIGH | — | MISSING | create-test |
| PIM — delete employee | /pim/viewEmployeeList | HIGH | — | MISSING | create-test |
| PIM — Employee Reports navigation | /pim/viewReports | MEDIUM | orangehrm-pim.cy.js | PARTIAL | Navigation only |
| PIM — Custom Fields navigation | /pim/customFields | MEDIUM | orangehrm-pim.cy.js | PARTIAL | Navigation only |
| Leave — Leave List view | /leave/viewLeaveList | HIGH | orangehrm-leave.cy.js | COVERED | — |
| Leave — Apply Leave form (display) | /leave/applyLeave | HIGH | orangehrm-leave.cy.js | PARTIAL | No submission; admin lacks leave balance |
| Leave — Submit leave request | /leave/applyLeave | HIGH | — | MISSING | Requires ESS user account |
| Leave — My Leave list | /leave/viewMyLeaveList | HIGH | — | MISSING | create-test |
| Leave — Entitlements | /leave/viewLeaveEntitlementReport | MEDIUM | — | MISSING | create-test |
| Time — Timesheet | /time/viewTimesheet | HIGH | — | MISSING | create-test |
| Time — Attendance record | /time/viewAttendanceRecord | HIGH | — | MISSING | create-test |
| Recruitment — Job Vacancies | /recruitment/viewJobVacancy | MEDIUM | — | MISSING | create-test |
| Performance — My Trackers | /performance/myTrackers | MEDIUM | — | MISSING | create-test |
| My Info — Personal Details | /pim/viewPersonalDetails | MEDIUM | — | MISSING | create-test |
| Buzz — Social Feed | /buzz/viewBuzz | LOW | — | MISSING | low-priority |

**Summary:** 12 COVERED · 11 PARTIAL · 16 MISSING

---

### Pokemon — API Flows

| Endpoint | Method | Priority | Test File | Status |
|---|---|---|---|---|
| /ability/:id | GET | HIGH | pokemon-api.cy.js | COVERED |
| /ability/9999 (non-existent) | GET | HIGH | pokemon-api.cy.js | COVERED |
| /pokemon/:id | GET | HIGH | pokemon-api.cy.js | COVERED |
| /ability?limit&offset (pagination) | GET | MEDIUM | pokemon-api.cy.js | COVERED |
| /type/:id | GET | MEDIUM | pokemon-api.cy.js | COVERED |
| /invalid_endpoint (400 handling) | GET | MEDIUM | pokemon-api.cy.js | COVERED |

---

## Test Health Report

### CRITICAL — Selector Collision in PIMPage.js

| File | Selector | Affected Properties | Risk |
|---|---|---|---|
| `PIMPage.js` | `.oxd-input` | `employeeIdInput`, `employeeIdField`, `usernameInput`, `passwordInput`, `confirmPasswordInput` | CRITICAL |

All five field properties in `PIMPage.js` resolve to `.oxd-input` — the same generic class.
Cypress will always return the **first matching element** unless `.eq(N)` is used, which is
also fragile. The POM cannot reliably distinguish between these fields.

**Fix:** Use label-anchored selectors (same pattern already used in `fillLoginDetails()`):
```js
// Before (broken):
usernameInput = '.oxd-input';

// After (correct):
getUsernameInput() {
  return cy.contains('.oxd-label', 'Username').closest('.oxd-input-group').find('input');
}
```

### CRITICAL — Index-based `.eq(N)` Selectors

| File | Line | Selector | Risk | Recommendation |
|---|---|---|---|---|
| `AdminPage.js` | selectUserRole() | `cy.get('.oxd-select-text').eq(0)` | CRITICAL | Scope to User Role label container |
| `AdminPage.js` | selectStatus() | `cy.get('.oxd-select-text').eq(1)` | CRITICAL | Scope to Status label container |
| `orangehrm-pim.cy.js` | 35 | `cy.get('.oxd-input').eq(1)` | CRITICAL | Use `cy.get('[name="employeeId"]')` or label-anchor |

### HIGH — CSS Class Selectors Coupled to OXD Framework Internals

All POMs rely exclusively on `oxd-*` class names. A complete list of HIGH-risk selectors:

| File | Selector | Risk | Recommendation |
|---|---|---|---|
| `LoginPage.js` | `.orangehrm-login-title` | HIGH | `cy.contains('h5', 'Login')` |
| `LoginPage.js` | `.orangehrm-login-branding img` | HIGH | `cy.get('img[alt*="branding"]')` or `data-testid` |
| `LoginPage.js` | `.orangehrm-login-forgot-header` | HIGH | `cy.contains('a', 'Forgot your password?')` |
| `LoginPage.js` | `.oxd-alert-content` | HIGH | `cy.get('[role="alert"]')` |
| `LoginPage.js` | `.oxd-input-field-error-message` | HIGH | `cy.get('.oxd-text').contains('Required')` |
| `DashboardPage.js` | `.oxd-glass-button` + assert `'U'` | HIGH | Assertion is user-initial-dependent; use role-based check |
| `AdminPage.js` | `.oxd-button--secondary` (Add btn) | HIGH | `cy.contains('button', 'Add')` |
| `AdminPage.js` | `.oxd-select-text` × 2 | HIGH | Label-anchored: `cy.contains('.oxd-label', 'User Role').siblings('[role="combobox"]')` |
| `NavigationComponent.js` | `.oxd-main-menu-item` | MEDIUM | `cy.contains()` wrapping mitigates fragility; acceptable |
| `LogoutPage.js` | `.oxd-userdropdown-tab` | MEDIUM | `[data-testid="user-dropdown-btn"]` |
| `LeavePage.js` | `.oxd-select-text` (leave type) | HIGH | Label-anchored selector |

### MEDIUM — Raw `cy.*` Calls Outside POM Layer

| File | Lines | Issue | Recommendation |
|---|---|---|---|
| `orangehrm-login.cy.js` | 68-69 | `cy.url()`, `cy.get('.orangehrm-forgot-password-title')` in test body | Move to `LoginPage.verifyForgotPasswordPage()` (already partially done in POM) |
| `orangehrm-admin.cy.js` | 51, 58-63, 66-70 | `cy.contains('.oxd-text--h6', ...)` directly in test | Extract to `AdminPage` / `NavigationComponent` assertion methods |
| `orangehrm-pim.cy.js` | 74 | `cy.contains('.oxd-text--h5', ...)` in test | Extract to `PIMPage.verifyReportsPage()` |

### LOW — Missing Network Intercepts in Search Flows

| File | Flow | Issue | Recommendation |
|---|---|---|---|
| `orangehrm-admin.cy.js` | User search | No `cy.intercept()` alias — relies on `defaultCommandTimeout: 10000` | `cy.intercept('GET', '**/viewSystemUser*').as('search')` → `cy.wait('@search')` |
| `orangehrm-pim.cy.js` | Employee search | Same — no intercept alias | `cy.intercept('GET', '**/viewEmployeeList*').as('search')` → `cy.wait('@search')` |

---

## Gaps by Priority

### CRITICAL — Must fix before release gate

1. **PIMPage.js selector collision** — 5 field properties all map to `.oxd-input`. Any test invoking
   `fillLoginDetails()` on the Add Employee form is likely targeting wrong inputs silently.

2. **3 index-based `.eq(N)` selectors** — `AdminPage.js` (×2) and `orangehrm-pim.cy.js:35` will
   break silently when any upstream input is added/removed from the form DOM.

3. **Leave submission untested** — The Apply Leave form is visible but the Submit button is never clicked.
   This is the primary Leave module mutation path with zero coverage.

### HIGH — Fix in current sprint

4. **Admin CRUD incomplete** — Add User (navigate only), Edit User (MISSING), Delete User (MISSING).

5. **PIM Edit Employee** — No test navigates to an employee's personal detail page.

6. **Time module — zero coverage** — Timesheet and attendance are uncovered.

7. **Performance module — zero coverage** — My Trackers flow uncovered.

8. **Dashboard widget assertion** — `.oxd-glass-button` assertion uses `'U'` (user initial).
   Will fail for any account not starting with 'U'. Replace with `cy.get('.oxd-glass-button').should('be.visible')`.

### MEDIUM — Plan for next sprint

9. **11 navigation-only PARTIAL tests** — verify page load but no meaningful content assertion.

10. **No Gherkin/BDD layer** — no `.feature` files, no traceability to acceptance criteria.

11. **No `@smoke` / `@regression` tag separation** — all 35 scenarios run together every CI execution.

12. **My Info, Recruitment modules** — zero coverage on common regression surfaces.

---

## Architecture Notes

### Strengths

- POM pattern consistently used across all 7 UI test files.
- Service Object pattern (`PokemonAPI`) well-structured and separated from UI tests.
- Custom command `cy.loginWithEnvCredentials()` reduces duplication across 5 test files.
- No hardcoded credentials — environment variables and fixtures used correctly.
- **Zero hardcoded `cy.wait(N)` calls** — strong positive quality indicator.
- Method chaining (fluent interface) applied uniformly in all POMs.
- `cypress-mochawesome-reporter` configured for readable CI reports.
- Label-anchored selector pattern (`cy.contains('.oxd-label', ...).closest(...).find('input')`)
  is already used correctly in `AdminPage.js`, `PIMPage.fillLoginDetails()`, `LeavePage.js` —
  this pattern should be expanded to all field selectors.

### Weaknesses

- Zero `data-testid` or ARIA selectors. Targeting a third-party app partially justifies this,
  but the label-anchored pattern should be used everywhere instead of `.eq(N)`.
- Selector collision in `PIMPage.js` is a correctness bug, not just a fragility risk.
- No Gherkin layer — zero traceability between acceptance criteria and scenarios.
- No `@smoke` / `@regression` tag differentiation.

---

## Recommendations

### Priority 1 (CRITICAL — before any release gate)

| # | Action | Command |
|---|---|---|
| 1 | Fix PIMPage.js selector collision — replace all `.oxd-input` field declarations with label-anchored selectors | Manual (see health report above) |
| 2 | Replace `AdminPage.js` `.eq(0)` / `.eq(1)` with label-anchored dropdown selectors | Manual |
| 3 | Replace `orangehrm-pim.cy.js:35` `.eq(1)` with attribute selector | Manual |

### Priority 2 (HIGH — current sprint)

| # | Action | Command |
|---|---|---|
| 4 | Generate updated POMs with stable selectors | `/tw-e2e-page-object source=cypress/e2e` |
| 5 | Create Admin CRUD tests (save user, edit user, delete user) | `/tw-exec-spec-generator` → `/tw-e2e-spec-to-test` |
| 6 | Create PIM edit-employee test | `/tw-e2e-spec-to-test` |
| 7 | Create Time module smoke tests | `/tw-e2e-spec-to-test` |
| 8 | Fix Dashboard `'U'` assertion | Manual |

### Priority 3 (MEDIUM — next sprint)

| # | Action | Command |
|---|---|---|
| 9 | Generate Gherkin feature files for all flows | `/tw-exec-spec-generator` |
| 10 | Extend 11 navigation-only tests with content assertions | `/tw-e2e-spec-to-test` |
| 11 | Add My Info and Recruitment smoke tests | `/tw-e2e-spec-to-test` |
| 12 | Add `cy.intercept()` waits to Admin and PIM search flows | Manual |
| 13 | Add `@smoke` / `@regression` tags | Manual |

---

## Next Steps in Full Audit Flow

This report completes **Step [1]** of your full E2E audit.

```
[2] /tw-e2e-page-object source=cypress/e2e
    Regenerate all POMs with stable, label-anchored and ARIA-based selectors
    before creating any new tests.

[3] /tw-exec-spec-generator
    Generate Gherkin specs for the 16 MISSING and 11 PARTIAL flows.

[4] /tw-e2e-spec-to-test
    Convert specs from [3] into Cypress tests using updated POMs from [2].

[5] /tw-a11y-audit mode=inject
    Inject axe-core into existing tests to detect WCAG 2.1 violations.
```

Would you like me to proceed with Step [2] (`/tw-e2e-page-object`)?
