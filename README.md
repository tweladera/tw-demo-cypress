# Cypress OrangeHRM Tests

Proyecto de pruebas automatizadas con Cypress para OrangeHRM Demo.

## 🚀 Características

- Pruebas E2E automatizadas con Cypress
- Configuración para múltiples navegadores
- Generación de reportes con Mochawesome
- Integración con GitHub Actions para CI/CD
- Captura de videos y screenshots
- Configuración optimizada para desarrollo y producción

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Git

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd tw-demo-cypress
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp env.example .env
# Edita .env con tus credenciales
```

## 🧪 Ejecutar Pruebas

### Desarrollo Local

```bash
# Abrir Cypress en modo interactivo
npm run cy:open

# Ejecutar todas las pruebas
npm run cy:run

# Ejecutar pruebas en modo debug
npm run cy:debug

# Limpiar resultados
npm run cy:clean
```

### Comandos Disponibles

- `npm run cy:open` - Abre Cypress Test Runner
- `npm run cy:run` - Ejecuta pruebas en modo headless
- `npm run cy:debug` - Ejecuta con debug habilitado
- `npm run cy:clean` - Limpia archivos de resultados
- `npm run cy:verify` - Verifica instalación de Cypress

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```env
ORANGEHRM_USERNAME=Admin
ORANGEHRM_PASSWORD=admin123
```

### Configuración de Cypress

El archivo `cypress.config.js` contiene la configuración principal de Cypress:

#### **Configuración Base**
- **Base URL**: `https://opensource-demo.orangehrmlive.com/web/index.php`
- **Viewport**: 1600x900 píxeles
- **Default Command Timeout**: 10 segundos
- **Spec Pattern**: `cypress/e2e/**/*.cy.{js,jsx,ts,tsx}`

#### **Configuración de Video y Screenshots**
- **Video**: Habilitado (`true`)
- **Video Compression**: 32 (optimizado para CI/CD)
- **Screenshot on Run Failure**: Habilitado (`true`)
- **Videos Folder**: `cypress/results/videos`
- **Screenshots Folder**: `cypress/results/screenshots`

#### **Configuración Avanzada**
- **Experimental Modify Obstructive Third Party Code**: Habilitado
- **User Agent**: Configurado para macOS Chrome 120
- **Watch for File Changes**: Deshabilitado (optimizado para CI/CD)

#### **Configuración de Reportes**
- **Reporter**: `cypress-multi-reporters`
- **Mochawesome Reporter Options**:
  - Charts habilitados
  - Report Page Title: 'Cypress Report Test'
  - Embedded Screenshots: Habilitado
  - Inline Assets: Habilitado
  - Save All Attempts: Deshabilitado
  - Overwrite: Habilitado
  - Report Directory: `cypress/results/mocha`
  - Report Filename: `[status]_[datetime]-cypress-report`

#### **Variables de Entorno**
- **ORANGEHRM_USERNAME**: Cargado desde `.env`
- **ORANGEHRM_PASSWORD**: Cargado desde `.env`

#### **Plugins Configurados**
- **cypress-on-fix**: Para compatibilidad con versiones de Cypress
- **cypress-mochawesome-reporter**: Para generación de reportes HTML

## 📊 Reportes

Los reportes se generan automáticamente en:
- `cypress/results/mocha/` - Reportes HTML con Mochawesome
- `cypress/results/videos/` - Videos de las pruebas
- `cypress/results/screenshots/` - Screenshots en caso de fallo

### **Configuración de Reportes**
El proyecto utiliza `cypress-mochawesome-reporter` para generar reportes HTML detallados:

- **Charts**: Gráficos de resultados habilitados
- **Embedded Screenshots**: Screenshots integrados en el reporte
- **Inline Assets**: Assets integrados para portabilidad
- **Report Directory**: `cypress/results/mocha`
- **Report Filename**: Formato `[status]_[datetime]-cypress-report`

### **Personalización de Reportes**
Para modificar la configuración de reportes, edita la sección `reporterOptions` en `cypress.config.js`:

```javascript
reporterOptions: {
  reporterEnabled: ['cypress-mochawesome-reporter'],
  cypressMochawesomeReporterReporterOptions: {
    charts: true,
    reportPageTitle: 'Tu Título Personalizado',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    screenshotsFolder: './cypress/results/screenshots',
    overwrite: true,
    reportDir: 'cypress/results/mocha',
    reportFilename: '[status]_[datetime]-cypress-report',
  },
}
```

## 🚀 CI/CD con GitHub Actions

### Workflow Disponible

**cypress.yml** - Workflow unificado que ejecuta pruebas en Chrome y Electron en paralelo

### Configuración de Secrets

En tu repositorio de GitHub, configura los siguientes secrets:

1. Ve a **Settings** > **Secrets and variables** > **Actions**
2. Agrega:
   - `ORANGEHRM_USERNAME`: Admin
   - `ORANGEHRM_PASSWORD`: admin123

### Triggers

Los workflows se ejecutan en:
- Push a `main` y `develop`
- Pull requests a `main` y `develop`
- Manualmente desde Actions

## 📁 Estructura del Proyecto

```
tw-demo-cypress/
├── cypress/
│   ├── e2e/           # Pruebas E2E
│   ├── fixtures/      # Datos de prueba
│   ├── support/       # Comandos personalizados
│   └── results/       # Reportes y artifacts
├── .github/
│   └── workflows/     # GitHub Actions
│       ├── cypress.yml
│       └── README.md
├── cypress.config.js  # Configuración de Cypress
├── env.example        # Plantilla de variables de entorno
└── package.json       # Dependencias y scripts
```

## 🔧 Personalización de Configuración

### **Modificar Configuración de Cypress**

Para personalizar la configuración, edita `cypress.config.js`:

#### **Configuración de Viewport**
```javascript
viewportWidth: 1600,  // Ancho del viewport
viewportHeight: 900,   // Alto del viewport
```

#### **Configuración de Timeouts**
```javascript
defaultCommandTimeout: 10000,  // Timeout en milisegundos
```

#### **Configuración de Video**
```javascript
video: true,                    // Habilitar/deshabilitar video
videoCompression: 32,          // Compresión de video (1-51)
```

#### **Configuración de Screenshots**
```javascript
screenshotOnRunFailure: true,  // Screenshots automáticos en fallo
screenshotsFolder: 'cypress/results/screenshots',
```

#### **Configuración de User Agent**
```javascript
userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
```

### **Variables de Entorno**

Para agregar nuevas variables de entorno:

1. **En `.env`:**
```env
ORANGEHRM_USERNAME=Admin
ORANGEHRM_PASSWORD=admin123
NUEVA_VARIABLE=valor
```

2. **En `cypress.config.js`:**
```javascript
env: {
  ORANGEHRM_USERNAME: process.env.ORANGEHRM_USERNAME,
  ORANGEHRM_PASSWORD: process.env.ORANGEHRM_PASSWORD,
  NUEVA_VARIABLE: process.env.NUEVA_VARIABLE,
}
```

3. **En las pruebas:**
```javascript
cy.log(Cypress.env('NUEVA_VARIABLE'))
```

## 🐛 Troubleshooting

### Problemas Comunes

1. **Tests fallan en CI pero pasan localmente**
   - Verifica variables de entorno en GitHub Secrets
   - Revisa logs de CI para errores específicos
   - Verifica que el cache no esté corrupto

2. **Videos no se generan**
   - Verifica `video: true` en configuración
   - Revisa espacio en disco del runner
   - Verifica que `trashAssetsBeforeRuns: true` esté configurado

3. **Tests son lentos**
   - El cache de node_modules debería acelerar las builds
   - Usa el workflow paralelo para mayor eficiencia
   - Optimiza las pruebas

4. **Errores de cache**
   - Los workflows eliminan node_modules y reinstalan
   - Verifica que package-lock.json esté actualizado
   - Revisa los logs de cache en los workflows

5. **Problemas con reportes**
   - Verifica que `cypress-mochawesome-reporter` esté instalado
   - Revisa la configuración de `reporterOptions`
   - Verifica permisos de escritura en `cypress/results/`

### Logs y Debug

```bash
# Ejecutar con debug
DEBUG=cypress:* npm run cy:run

# Verificar instalación
npm run cy:verify

# Limpiar cache
npm run cy:clean
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## 📦 Plugins y Dependencias

### **Plugins Principales**

#### **cypress-mochawesome-reporter**
- **Propósito**: Generación de reportes HTML detallados
- **Configuración**: Automática en `cypress.config.js`
- **Output**: Reportes en `cypress/results/mocha/`

#### **cypress-on-fix**
- **Propósito**: Compatibilidad con versiones de Cypress
- **Configuración**: Automática en `setupNodeEvents`

#### **cypress-multi-reporters**
- **Propósito**: Soporte para múltiples reportes
- **Configuración**: Integrado con Mochawesome

### **Dependencias de Desarrollo**

#### **Reportes**
- `mochawesome`: Generador de reportes HTML
- `mochawesome-merge`: Combinación de reportes
- `mochawesome-report-generator`: Generación de reportes

#### **Utilidades**
- `rimraf`: Limpieza de archivos
- `dotenv`: Variables de entorno
- `eslint`: Linting de código

#### **Testing**
- `cypress`: Framework de testing
- `@types/cypress`: Tipos de TypeScript

## 📞 Soporte

Para soporte, revisa:
- [Documentación de Cypress](https://docs.cypress.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Mochawesome Documentation](https://github.com/adamgruber/mochawesome)
- Issues del repositorio
