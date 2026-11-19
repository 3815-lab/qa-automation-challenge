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

Los tests de bugs conocidos afirman el comportamiento esperado, así que hoy fallan y quedan fuera de la corrida por defecto. Para ejecutarlos:

```bash
npm run cy:known-bugs                                  # en e2e-cypress
./mvnw test "-Dkarate.options=--tags @known-bug"       # en api-karate
```

## Qué se automatizó

**E2E - SauceDemo** (15 tests: 14 pasan, 1 pendiente por bug conocido)

- Flujo de compra completo: login, agregar dos productos, ver el carrito, llenar el formulario y finalizar hasta la confirmación de la orden.
- Casos de apoyo: login negativo, control de acceso sin sesión, validaciones del formulario de compra y quitar productos del carrito.
- Bug conocido documentado como test: el sitio permite comprar con el carrito vacío.

**APIs - Demoblaze** (12 escenarios en la corrida por defecto + 8 de bugs conocidos)

- Signup: usuario nuevo y usuario ya existente.
- Login: credenciales correctas y password incorrecto.
- Casos de apoyo: usuario inexistente, parámetros faltantes, signup duplicado con otro password y token predecible.
- Bugs conocidos (`@known-bug`): la API responde 500 con username vacío o null, y registra usuarios con password vacío, null o numérico.

## Reportes

- E2E: [`e2e-cypress/reports/reporte-e2e.html`](e2e-cypress/reports/reporte-e2e.html)
- APIs: [`api-karate/reports/karate-summary.html`](api-karate/reports/karate-summary.html)
- APIs, bugs conocidos: [`api-karate/reports/known-bugs/karate-summary.html`](api-karate/reports/known-bugs/karate-summary.html)
