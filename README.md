# Prueba técnica QA - Automatización E2E y APIs

Repo con los dos ejercicios de la prueba:

| Ejercicio | Carpeta | Herramienta | Opción elegida |
|-----------|---------|-------------|----------------|
| E2E | [`e2e-cypress/`](e2e-cypress) | Cypress + TypeScript | Opción 2 - flujo de compra en https://www.saucedemo.com/ |
| APIs | [`api-karate/`](api-karate) | Karate + Maven | Opción 1 - signup y login de https://api.demoblaze.com |

Cada carpeta es un proyecto independiente con su propio:

- `readme.txt` - instrucciones paso a paso de ejecución
- `conclusiones.txt` - hallazgos y conclusiones
- `reports/` - reporte de la última ejecución, como evidencia

## Requisitos

- Node.js 20 o superior
- JDK 17 o superior (Maven no hace falta, se usa el wrapper `mvnw`)

## Ejecución rápida

```bash
# E2E
cd e2e-cypress
npm install
npm test

# APIs
cd api-karate
./mvnw test        # en Windows: mvnw.cmd test
```

## Qué se automatizó

**E2E - SauceDemo** (7 tests)

- Flujo de compra completo: login, agregar dos productos, ver el carrito, llenar el formulario y finalizar hasta la confirmación de la orden.
- Casos de apoyo: login con usuario bloqueado y password incorrecto, validaciones del formulario de compra.

**APIs - Demoblaze** (10 escenarios)

- Signup: usuario nuevo y usuario ya existente.
- Login: credenciales correctas y password incorrecto.
- Casos de apoyo: usuario inexistente y parámetros faltantes.

## Reportes

- E2E: [`e2e-cypress/reports/reporte-e2e.html`](e2e-cypress/reports/reporte-e2e.html)
- APIs: [`api-karate/reports/karate-summary.html`](api-karate/reports/karate-summary.html)
