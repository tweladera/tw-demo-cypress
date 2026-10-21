# TypeScript Unit Test Governance Report

**Generated**: 2026-10-20 00:00:00
**Skill**: /tw-ts-test-governor
**Skill version**: v0.1.0

---

## Executive Summary

- **Repository analyzed**: `/Users/evansladera/workspace-tw/tw-qa/tw-demo-cypress`
- **Overall decision**: `HALT`
- **Primary risk**: Este repositorio es un proyecto de automatización E2E puro — no existe ninguna capa de tests unitarios Jest, ni código de producción TypeScript independiente de Cypress. No hay infraestructura sobre la cual correr Stryker en modo estándar.

---

## Findings

| Area | File | Finding | Severity | Action |
|------|------|---------|----------|--------|
| Infraestructura | `package.json` | No existe script `test` ni `test:cov`. Jest no está instalado ni configurado. | CRITICAL | create-test |
| Coverage Gap | `cypress/support/pages/LoginPage.js` | Page Object con 9 métodos y lógica de aserción — sin spec unitario | HIGH | create-test (condicional) |
| Coverage Gap | `cypress/support/services/PokemonAPI.js` | Service Object con 6 métodos de request y 5 de aserción — sin spec unitario | HIGH | create-test (condicional) |
| Coverage Gap | `cypress/support/pages/AdminPage.js` | Page Object sin spec unitario | MEDIUM | create-test (condicional) |
| Coverage Gap | `cypress/support/pages/PIMPage.js` | Page Object sin spec unitario | MEDIUM | create-test (condicional) |
| Coverage Gap | `cypress/support/pages/DashboardPage.js` | Page Object sin spec unitario | MEDIUM | no-test-needed (ver nota) |
| Arquitectura | `cypress.config.js` | No hay separación entre código testeable con Jest y código dependiente de Cypress. Todos los módulos usan `cy.*` internamente. | HIGH | refactor (pre-requisito) |

---

## Impacted Modules

| Module | Type | Spec File | Status | Decision |
|--------|------|-----------|--------|----------|
| `cypress/support/pages/LoginPage.js` | Page Object | — | unmapped | create-test (bloqueado: depende de `cy.*`) |
| `cypress/support/pages/DashboardPage.js` | Page Object | — | unmapped | no-test-needed |
| `cypress/support/pages/AdminPage.js` | Page Object | — | unmapped | create-test (bloqueado) |
| `cypress/support/pages/PIMPage.js` | Page Object | — | unmapped | create-test (bloqueado) |
| `cypress/support/pages/NavigationComponent.js` | Page Object | — | unmapped | create-test (bloqueado) |
| `cypress/support/services/PokemonAPI.js` | Service Object | — | unmapped | create-test (condicional) |
| `cypress/support/commands.js` | Support | — | support | no-test-needed |
| `cypress/support/e2e.js` | Support | — | support | no-test-needed |

---

## Root Cause Analysis

El bloqueante sistémico es arquitectural: **todos los módulos "de producción" de este repositorio (Page Objects y Service Objects) dependen directamente de la API de Cypress (`cy.*`)**, lo que los hace no instanciables fuera del runner de Cypress. Esto impide ejecutar Jest contra ellos sin un mock extensivo del objeto `cy`.

Hay **0 spec files Jest** en todo el repositorio. Correr `npm run test:cov` fallaría porque ni siquiera hay un script `test` en `package.json`.

---

## Suggested or Generated Tests

| Module | Status | Blocker |
|--------|--------|---------|
| `PokemonAPI.js` — lógica de assertion (`verifyAbilityResponse`, `verifyNotFoundResponse`, etc.) | READY | Las funciones `verify*` usan `expect()` de Chai puro, extraíbles a un módulo sin dependencia de Cypress |
| `LoginPage.js` — acciones | BLOCKED | Depende de `cy.get()`, `cy.contains()`, `cy.visit()` — requiere mock de `cy` |
| Resto de Page Objects | BLOCKED | Mismo bloqueante que `LoginPage` |

---

## Risks and Limitations

- **Riesgo 1 — Stryker no puede ejecutarse**: Sin tests unitarios Jest que sirvan de red de contención, Stryker no tiene con qué medir si un mutante sobrevive. El mutation score sería 0% o el proceso fallaría con error de configuración.
- **Riesgo 2 — Acoplamiento total a Cypress**: Los Page Objects y Services mezclan lógica de negocio (selectores, lógica de aserción) con comandos Cypress. Separar esta lógica requeriría un refactor previo al test unitario.
- **Riesgo 3 — Proyecto incorrecto para ts-test-governor**: Este skill está diseñado para auditar apps NestJS/TypeScript con Jest. Este repositorio ES la capa de test, no la aplicación bajo prueba. El skill correcto para auditar la salud de estos tests es `/tw-e2e-test-governor`.

---

## Recommendations

**Priority 1 — CRITICAL**
El objetivo de mutation testing no puede lograrse directamente sobre este repositorio en su estado actual. Hay dos caminos:

- **Camino A** — Extraer la lógica testeable a módulos puros (sin `cy.*`) y agregar Jest + Stryker. Aplica principalmente a los métodos `verify*` de `PokemonAPI.js`.
- **Camino B** — Usar `@stryker-mutator/cypress-runner` que muta el código de los tests Cypress mismos. Pero dado que el target es una app externa (OrangeHRM demo), las mutaciones no impactarían código local.

**Priority 2 — HIGH**
Antes de cualquier mutation testing, correr `/tw-e2e-test-governor` para auditar la cobertura E2E existente — ese es el skill correcto para este tipo de repositorio.

**Priority 3 — MEDIUM**
Si se decide agregar Jest, instalar `jest`, `@babel/preset-env`, y configurar un `jest.config.js` que excluya archivos con dependencias de `cy.*`. Empezar con los métodos `verify*` de `PokemonAPI.js` que usan Chai puro y son candidatos inmediatos.

---

Would you like me to: 1) Correr `/tw-e2e-test-governor` que es el skill adecuado para este proyecto, 2) Extraer la lógica testeable de `PokemonAPI.js` a un módulo puro y generar un spec Jest listo para Stryker, 3) Configurar `@stryker-mutator/cypress-runner` para mutation testing sobre los test files Cypress directamente?
