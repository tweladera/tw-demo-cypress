# Cypress Cheat Sheet

## Tabla de Contenidos
- [Comandos Básicos](#comandos-básicos)
- [Selectores](#selectores)
- [Acciones](#acciones)
- [Assertions (Aserciones)](#assertions-aserciones)
- [Esperas y Timeouts](#esperas-y-timeouts)
- [Hooks](#hooks)
- [Variables y Alias](#variables-y-alias)
- [Manejo de Cookies y LocalStorage](#manejo-de-cookies-y-localstorage)
- [Network Requests](#network-requests)
- [Utilidades](#utilidades)
- [Configuración](#configuración)
- [Buenas Prácticas](#buenas-prácticas)

## Comandos Básicos

### Instalación
```bash
# Instalar Cypress mediante npm
npm install cypress --save-dev

# Abrir Cypress Test Runner
npx cypress open

# Ejecutar tests desde la línea de comandos
npx cypress run
```

### Estructura del Proyecto
```
cypress/
├── fixtures/         # Datos de prueba
├── e2e/              # Archivos de tests
├── results/          # Resultados de ejecución de tests
└── support/          # Comandos personalizados
```

### Iniciar Tests
```javascript
// Visitar una URL
cy.visit('https://example.com')

// Visitar una URL con opciones
cy.visit('https://example.com', {
  timeout: 30000,
  headers: {
    'x-custom-header': 'value'
  }
})
```

## Selectores

### Selección de Elementos
```javascript
// Por tag
cy.get('button')

// Por id
cy.get('#elemento-id')

// Por clase
cy.get('.elemento-clase')

// Por atributo
cy.get('[data-test="valor"]')

// Por combinación de selectores
cy.get('button.submit-btn[type="submit"]')

// Por texto
cy.contains('Texto del elemento')

// Por expresión regular
cy.contains(/^texto/i)

// Elementos anidados
cy.get('form').find('input')

// Elemento específico (índice)
cy.get('li').eq(2)

// Primer elemento
cy.get('li').first()

// Último elemento
cy.get('li').last()

// Elemento padre
cy.get('li').parent()

// Elementos hijos
cy.get('ul').children()

// Elementos hermanos
cy.get('li').siblings()

// Elemento anterior
cy.get('li').prev()

// Elemento siguiente
cy.get('li').next()
```

## Acciones

### Interacciones con Elementos
```javascript
// Click
cy.get('button').click()

// Click en posición específica
cy.get('button').click({ position: 'topLeft' })

// Doble click
cy.get('button').dblclick()

// Click derecho
cy.get('button').rightclick()

// Escribir texto
cy.get('input').type('Texto de ejemplo')

// Escribir con opciones
cy.get('input').type('Texto {selectall} {backspace}', { delay: 100 })

// Teclas especiales
cy.get('input').type('{enter}')  // Enter
cy.get('input').type('{esc}')    // Escape
cy.get('input').type('{ctrl+a}') // Control+A

// Borrar contenido
cy.get('input').clear()

// Seleccionar opción en dropdown
cy.get('select').select('opcion')

// Seleccionar múltiples opciones
cy.get('select[multiple]').select(['opcion1', 'opcion2'])

// Marcar/desmarcar checkbox
cy.get('[type="checkbox"]').check()
cy.get('[type="checkbox"]').uncheck()

// Marcar radio button
cy.get('[type="radio"]').check('valor')

// Submit de formulario
cy.get('form').submit()

// Arrastrar y soltar
cy.get('.elemento').drag('.destino')

// Focus en elemento
cy.get('input').focus()
cy.get('input').blur()

// Scroll
cy.scrollTo('bottom')
cy.get('.elemento').scrollIntoView()

// Hover (simulación)
cy.get('button').trigger('mouseover')
```

## Assertions (Aserciones)

### Assertions Básicas
```javascript
// Existencia
cy.get('button').should('exist')
cy.get('button').should('not.exist')

// Visibilidad
cy.get('button').should('be.visible')
cy.get('button').should('not.be.visible')

// Estado
cy.get('input').should('be.disabled')
cy.get('input').should('be.enabled')
cy.get('input').should('be.checked')
cy.get('[type="checkbox"]').should('be.checked')
cy.get('option').should('be.selected')

// Clase
cy.get('div').should('have.class', 'active')

// Valor
cy.get('input').should('have.value', 'texto')

// Texto
cy.get('p').should('have.text', 'Texto exacto')
cy.get('p').should('contain', 'texto parcial')
cy.get('p').should('not.contain', 'otro texto')

// Atributo
cy.get('img').should('have.attr', 'src')
cy.get('img').should('have.attr', 'alt', 'descripción')

// CSS
cy.get('button').should('have.css', 'color', 'rgb(255, 0, 0)')

// Longitud
cy.get('li').should('have.length', 5)
cy.get('li').should('have.length.gt', 3)  // Mayor que
cy.get('li').should('have.length.lt', 10) // Menor que

// Propiedad
cy.window().should('have.property', 'localStorage')
```

### Assertions Múltiples
```javascript
// Encadenar assertions
cy.get('button')
  .should('be.visible')
  .and('have.class', 'primary')
  .and('contain', 'Enviar')

// Assertions complejas
cy.get('div').should(($div) => {
  expect($div).to.have.length(5)
  expect($div.first()).to.contain('texto')
  expect(parseFloat($div.text())).to.be.greaterThan(10)
})
```

## Esperas y Timeouts

### Control de Tiempo
```javascript
// Esperar tiempo fijo (no recomendado, usar solo si es necesario)
cy.wait(2000)  // Espera 2 segundos

// Esperar por una petición de red
cy.intercept('GET', '/api/users').as('usuarios')
cy.wait('@usuarios')

// Establecer timeout personalizado
cy.get('.elemento', { timeout: 10000 })  // Espera hasta 10 segundos

// Establecer timeout global
Cypress.config('defaultCommandTimeout', 10000)

// Reintento con intervalo personalizado
cy.get('.elemento', { timeout: 10000, interval: 500 })
```

## Hooks

### Ciclo de Vida
```javascript
// Antes de todos los tests en la suite
before(() => {
  // Configuración inicial
})

// Después de todos los tests en la suite
after(() => {
  // Limpieza final
})

// Antes de cada test
beforeEach(() => {
  // Acciones previas a cada test
  cy.visit('/')
})

// Después de cada test
afterEach(() => {
  // Limpieza después de cada test
})
```

### Organización de Tests
```javascript
// Agrupar tests
describe('Grupo de tests', () => {
  it('test específico', () => {
    // Test
  })
  
  // Subgrupo
  context('Subgrupo de tests', () => {
    it('otro test', () => {
      // Test
    })
  })
})

// Saltar tests
it.skip('Este test será omitido', () => {
  // Test no se ejecutará
})

// Exclusivo (solo ejecutar este)
it.only('Solo se ejecutará este test', () => {
  // Solo este test se ejecutará
})
```

## Variables y Alias

### Alias y Referencias
```javascript
// Crear alias para elementos
cy.get('button').as('submitButton')
cy.get('@submitButton').click()

// Alias para rutas
cy.intercept('GET', '/api/users').as('getUsers')
cy.wait('@getUsers')

// Alias para datos de fixture
cy.fixture('users').as('userData')
cy.get('@userData').then((userData) => {
  // Usar los datos
})

// Guardar valores para uso posterior
cy.get('.contador').invoke('text').then((text) => {
  const valorInicial = parseFloat(text)
  // Usar valor
})
```

## Manejo de Cookies y LocalStorage

### Cookies
```javascript
// Obtener cookie
cy.getCookie('nombre')

// Verificar cookie
cy.getCookie('nombre').should('have.property', 'value', 'valor')

// Establecer cookie
cy.setCookie('nombre', 'valor')

// Borrar cookie
cy.clearCookie('nombre')

// Borrar todas las cookies
cy.clearCookies()
```

### LocalStorage
```javascript
// Establecer item en localStorage
cy.window().then((win) => {
  win.localStorage.setItem('key', 'value')
})

// Obtener item del localStorage
cy.window().then((win) => {
  const value = win.localStorage.getItem('key')
})

// Limpiar localStorage
cy.clearLocalStorage()
```

## Network Requests

### Intercepción de Peticiones
```javascript
// Interceptar petición GET
cy.intercept('GET', '/api/users').as('getUsers')

// Interceptar con comodines
cy.intercept('GET', '/api/*').as('apiCalls')

// Interceptar y modificar respuesta
cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers')

// Interceptar y responder dinámicamente
cy.intercept('GET', '/api/users', (req) => {
  req.reply({
    statusCode: 200,
    body: {
      users: [
        { id: 1, name: 'Usuario 1' },
        { id: 2, name: 'Usuario 2' }
      ]
    }
  })
}).as('getUsers')

// Verificar detalles de la petición
cy.wait('@getUsers').its('request.body').should('deep.equal', expectedData)
cy.wait('@getUsers').its('response.statusCode').should('eq', 200)
```

### Realizar Peticiones
```javascript
// GET request
cy.request('GET', '/api/users').then((response) => {
  expect(response.status).to.eq(200)
  expect(response.body).to.have.length(10)
})

// POST request
cy.request({
  method: 'POST',
  url: '/api/users',
  body: { name: 'Nuevo Usuario' },
  headers: { 'Content-Type': 'application/json' }
}).then((response) => {
  expect(response.status).to.eq(201)
})
```

## Utilidades

### Fixtures
```javascript
// Cargar datos de fixture
cy.fixture('users').then((users) => {
  // Usar datos
})

// Cargar fixture con opciones
cy.fixture('users.json', { encoding: 'utf8' }).as('usersData')
```

### Comandos Personalizados
```javascript
// Definir comando personalizado (en cypress/support/commands.js)
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.get('button[type="submit"]').click()
})

// Usar comando personalizado
cy.login('usuario@ejemplo.com', 'contraseña')
```

### Debugging
```javascript
// Pausar el test
cy.pause()

// Depurar con console.log
cy.get('.elemento').then(($el) => {
  console.log($el)
})

// Depurar con debugger
cy.get('.elemento').then(() => {
  debugger
})

// Capturar screenshot
cy.screenshot('nombre-captura')

// Imprimir en la consola
cy.log('Mensaje de depuración')
```

## Configuración

### Archivo cypress.config.js
```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://example.com',
    defaultCommandTimeout: 5000,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/node_modules/**', '**/cypress.config.{js,ts}'],
    retries: {
      runMode: 2,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      // Configuración de plugins
    }
  }
})
```

### Variables de Entorno
```javascript
// cypress.env.json
{
  "apiUrl": "https://api.example.com",
  "adminUser": "admin",
  "adminPass": "secreto"
}

// Uso de variables de entorno
cy.visit(Cypress.env('apiUrl'))
cy.login(Cypress.env('adminUser'), Cypress.env('adminPass'))
```

## Buenas Prácticas

### Recomendaciones Generales
1. **No uses `cy.wait()` con tiempo fijo** - Usa esperas basadas en condiciones o eventos
2. **Usa selectores de datos dedicados** - Preferir `data-testid` o `data-cy` sobre selectores CSS o ID
3. **No encadenes demasiadas aserciones** - Divide tus tests en unidades lógicas más pequeñas
4. **Aísla tus tests** - Cada test debe ser independiente y no depender de otros
5. **Utiliza fixtures para datos de prueba** - Evita hardcodear datos en los tests
6. **Crea comandos personalizados** - Para acciones repetitivas como login
7. **Limpia el estado entre tests** - Usa `beforeEach` y `afterEach` para reiniciar el estado
8. **Usa interceptores** - Para simular APIs y probar diferentes escenarios
9. **Minimiza las dependencias externas** - Stub o mock servicios externos cuando sea posible
10. **Documenta tus tests** - Utiliza nombres descriptivos y comentarios cuando sea necesario

### Patrones a Evitar
- No uses `cy.pause()` o `debugger` en código de producción
- No hagas aserciones en bucles (pueden comportarse de manera inesperada)
- Evita visitas múltiples a páginas en un solo test
- No dependas de resultados de tests anteriores
- No uses selectores frágiles (IDs que cambian, índices, etc.)
