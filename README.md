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

El archivo `cypress.config.js` contiene la configuración principal:

- Base URL: OrangeHRM Demo
- Viewport: 1600x900
- Timeout: 10 segundos
- Videos y screenshots habilitados
- Reportes con Mochawesome

## 📊 Reportes

Los reportes se generan automáticamente en:
- `cypress/results/mocha/` - Reportes HTML
- `cypress/results/videos/` - Videos de las pruebas
- `cypress/results/screenshots/` - Screenshots en caso de fallo

## 🚀 CI/CD con GitHub Actions

### Workflows Disponibles

1. **cypress-tests.yml** - Workflow completo con múltiples navegadores
2. **cypress-quick.yml** - Workflow rápido para desarrollo
3. **cypress-optimized.yml** - Workflow optimizado con cache

### Configuración de Secrets

En tu repositorio de GitHub, configura los siguientes secrets:

1. Ve a **Settings** > **Secrets and variables** > **Actions**
2. Agrega:
   - `ORANGEHRM_USERNAME`: Usuario de OrangeHRM
   - `ORANGEHRM_PASSWORD`: Contraseña de OrangeHRM

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
├── cypress.config.js  # Configuración de Cypress
└── package.json       # Dependencias y scripts
```

## 🐛 Troubleshooting

### Problemas Comunes

1. **Tests fallan en CI pero pasan localmente**
   - Verifica variables de entorno en GitHub Secrets
   - Revisa logs de CI para errores específicos

2. **Videos no se generan**
   - Verifica `video: true` en configuración
   - Revisa espacio en disco del runner

3. **Tests son lentos**
   - Usa el workflow rápido para desarrollo
   - Optimiza las pruebas

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

## 📞 Soporte

Para soporte, revisa:
- [Documentación de Cypress](https://docs.cypress.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Issues del repositorio
