PRUEBA E2E - FLUJO DE COMPRA EN SAUCEDEMO (CYPRESS)
====================================================

Opcion elegida: Opcion 2 - https://www.saucedemo.com/
Herramienta: Cypress 16 + TypeScript, patron Page Object, reporte mochawesome.


1. PRERREQUISITOS
-----------------
- Node.js 20 o superior (probado con Node 24) y npm
- Google Chrome o Electron (Electron viene incluido con Cypress)
- Conexion a internet (la prueba corre contra el sitio publico)


2. INSTALACION
--------------
Desde la raiz del repo:

    cd e2e-cypress
    npm install

La primera vez npm descarga el binario de Cypress, puede tardar un par de minutos.


3. EJECUCION
------------
a) Modo headless (el que genera el reporte):

    npm test

b) Modo interactivo, para ver la prueba paso a paso:

    npm run cy:open
    -> elegir "E2E Testing", un navegador y luego el spec purchase-flow.cy.ts

c) Solo el flujo de compra que pide el ejercicio:

    npx cypress run --spec cypress/e2e/purchase-flow.cy.ts

d) En Chrome en vez de Electron:

    npx cypress run --browser chrome

e) Revisar tipos de TypeScript (opcional):

    npm run typecheck


4. REPORTES
-----------
- Cada corrida genera cypress/reports/reporte-e2e.html (un solo html, se abre con doble clic).
- Si un test falla, el screenshot queda embebido en el mismo reporte.
- En la carpeta reports/ esta el reporte de la ultima corrida que hice, como evidencia.


5. QUE SE PRUEBA
----------------
cypress/e2e/purchase-flow.cy.ts  (el flujo que pide el ejercicio)
    1. Login con standard_user / secret_sauce
    2. Agrega dos productos al carrito y valida el contador
    3. Abre el carrito y valida nombres y precios
    4. Completa el formulario de compra
    5. En el resumen valida productos, subtotal y total (subtotal + impuesto)
    6. Finaliza y valida la confirmacion "Thank you for your order!"

cypress/e2e/login.cy.ts  (apoyo)
    - Login correcto, usuario bloqueado y password incorrecto

cypress/e2e/checkout-validation.cy.ts  (apoyo)
    - El formulario no avanza si falta nombre, apellido o codigo postal


6. ESTRUCTURA
-------------
e2e-cypress/
  cypress.config.ts        configuracion (baseUrl, timeouts, retries, reporter)
  cypress/
    e2e/                   specs
    pages/                 page objects, uno por pantalla
    fixtures/              datos de prueba: usuarios, productos, datos del checkout
    support/
      commands.ts          comandos custom: cy.getByTestId y cy.login
      utils.ts             helpers de precios
      types.ts             tipos de los datos de prueba
  reports/                 reporte de evidencia
  readme.txt
  conclusiones.txt

Para cambiar los productos que se compran o los datos del formulario solo hay
que editar cypress/fixtures/products.json y cypress/fixtures/checkout.json,
no hace falta tocar el test.
