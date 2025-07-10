# GitHub Actions Workflows para Cypress

Este directorio contiene los workflows de GitHub Actions para ejecutar las pruebas de Cypress automáticamente.

## Workflows Disponibles

### 1. `cypress-tests.yml` - Workflow Completo
- Ejecuta pruebas en múltiples navegadores (Chrome, Firefox, Edge)
- Ejecuta en múltiples versiones de Node.js (18, 20)
- Genera reportes consolidados
- Incluye notificaciones

### 2. `cypress-quick.yml` - Workflow Rápido
- Ejecuta pruebas solo en Chrome
- Más rápido para desarrollo
- Ideal para validaciones rápidas

## Configuración de Secrets

Para que los workflows funcionen correctamente, necesitas configurar los siguientes secrets en tu repositorio de GitHub:

1. Ve a tu repositorio en GitHub
2. Navega a **Settings** > **Secrets and variables** > **Actions**
3. Agrega los siguientes secrets:

### Secrets Requeridos:
- `ORANGEHRM_USERNAME`: Usuario para OrangeHRM
- `ORANGEHRM_PASSWORD`: Contraseña para OrangeHRM

### Cómo agregar secrets:
1. Click en **New repository secret**
2. Nombre: `ORANGEHRM_USERNAME`
3. Valor: Tu usuario de OrangeHRM
4. Repite para `ORANGEHRM_PASSWORD`

## Triggers

Los workflows se ejecutan automáticamente en:
- Push a las ramas `main` y `develop`
- Pull requests a las ramas `main` y `develop`
- Manualmente desde la pestaña Actions

## Artifacts Generados

Los workflows generan los siguientes artifacts:
- **Screenshots**: Capturas de pantalla en caso de fallo
- **Videos**: Grabaciones de las pruebas
- **Test Results**: Resultados detallados de las pruebas
- **Consolidated Reports**: Reportes HTML consolidados (solo en workflow completo)

## Configuración Local

Para probar localmente antes de hacer push:

```bash
# Instalar dependencias
npm ci

# Ejecutar pruebas localmente
npm run cy:run

# Abrir Cypress en modo interactivo
npm run cy:open
```

## Troubleshooting

### Problemas Comunes:

1. **Tests fallan en CI pero pasan localmente**
   - Verifica que las variables de entorno estén configuradas
   - Revisa los logs de CI para errores específicos

2. **Videos no se generan**
   - Verifica que `video: true` esté en la configuración
   - Revisa el espacio en disco del runner

3. **Tests son lentos**
   - Considera usar el workflow rápido para desarrollo
   - Optimiza las pruebas para reducir tiempo de ejecución

## Personalización

Puedes personalizar los workflows modificando:
- Navegadores en la matriz
- Versiones de Node.js
- Configuración de Cypress
- Retención de artifacts
- Notificaciones 