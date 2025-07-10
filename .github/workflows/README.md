# GitHub Actions Workflows para Cypress

Este directorio contiene los workflows de GitHub Actions para ejecutar las pruebas de Cypress automáticamente, optimizados para Chrome y Electron.

## Workflows Disponibles

### 1. `cypress-chrome.yml` - Workflow para Chrome
- Ejecuta pruebas específicamente en Chrome
- Optimizado con cache de node_modules
- Artifacts con retención de 2 días
- Incluye comandos de cache de Cypress

### 2. `cypress-electron.yml` - Workflow para Electron
- Ejecuta pruebas específicamente en Electron
- Optimizado con cache de node_modules
- Artifacts con retención de 2 días
- Incluye comandos de cache de Cypress

### 3. `cypress-parallel.yml` - Workflow Paralelo
- Ejecuta pruebas en Chrome y Electron en paralelo
- Usa matriz de navegadores para eficiencia
- Fail-fast deshabilitado para mayor estabilidad
- Artifacts separados por navegador

## Configuración de Secrets

Para que los workflows funcionen correctamente, necesitas configurar los siguientes secrets en tu repositorio de GitHub:

1. Ve a tu repositorio en GitHub
2. Navega a **Settings** > **Secrets and variables** > **Actions**
3. Agrega los siguientes secrets:

### Secrets Requeridos:
- `ORANGEHRM_USERNAME`: Usuario para OrangeHRM (Admin)
- `ORANGEHRM_PASSWORD`: Contraseña para OrangeHRM (admin123)

### Cómo agregar secrets:
1. Click en **New repository secret**
2. Nombre: `ORANGEHRM_USERNAME`
3. Valor: `Admin`
4. Repite para `ORANGEHRM_PASSWORD` con valor `admin123`

## Triggers

Los workflows se ejecutan automáticamente en:
- Push a las ramas `main` y `develop`
- Pull requests a las ramas `main` y `develop`
- Manualmente desde la pestaña Actions

## Artifacts Generados

Los workflows generan los siguientes artifacts con retención de 2 días:
- **Videos**: Grabaciones de las pruebas (`cypress/results/videos/`)
- **Test Results**: Resultados detallados de las pruebas (`cypress/results/`)
- **Screenshots**: Capturas de pantalla en caso de fallo (`cypress/results/screenshots/`)

## Optimizaciones Implementadas

### Cache de Dependencias
- Cache de `node_modules` basado en `package-lock.json`
- Restauración automática de cache para builds más rápidos

### Comandos de Cypress Cache
- `cypress cache path` - Muestra la ruta del cache
- `cypress cache list` - Lista archivos en cache
- `cypress info` - Información de instalación

### Limpieza y Reinstalación
- Eliminación completa de `node_modules` antes de reinstalar
- Instalación limpia de dependencias en cada ejecución

## Configuración Local

Para probar localmente antes de hacer push:

```bash
# Instalar dependencias
npm ci

# Ejecutar pruebas localmente en Chrome
npx cypress run --browser chrome

# Ejecutar pruebas localmente en Electron
npx cypress run --browser electron

# Abrir Cypress en modo interactivo
npm run cy:open
```

## Troubleshooting

### Problemas Comunes:

1. **Tests fallan en CI pero pasan localmente**
   - Verifica que las variables de entorno estén configuradas
   - Revisa los logs de CI para errores específicos
   - Asegúrate de que el cache no esté corrupto

2. **Videos no se generan**
   - Verifica que `video: true` esté en la configuración
   - Revisa el espacio en disco del runner
   - Verifica que `trashAssetsBeforeRuns: true` esté configurado

3. **Tests son lentos**
   - El cache de node_modules debería acelerar las builds
   - Considera usar el workflow paralelo para mayor eficiencia
   - Optimiza las pruebas para reducir tiempo de ejecución

4. **Errores de cache**
   - Los workflows eliminan node_modules y reinstalan
   - Verifica que package-lock.json esté actualizado
   - Revisa los logs de cache en los workflows

## Personalización

Puedes personalizar los workflows modificando:
- Navegadores en la matriz (solo Chrome y Electron)
- Configuración de Cypress
- Retención de artifacts (actualmente 2 días)
- Comandos de cache y verificación
- Variables de entorno

## Comparación con GitLab CI

Los workflows están basados en la configuración de GitLab CI proporcionada:
- Misma estrategia de cache
- Mismos comandos de Cypress
- Misma estructura de artifacts
- Misma retención de 2 días 