/// <reference types="cypress" />

// saucedemo usa el atributo data-test en casi todos los elementos
Cypress.Commands.add('getByTestId', (testId: string, options?) => {
  return cy.get(`[data-test="${testId}"]`, options);
});

// login por UI cacheado con cy.session, para los specs que no prueban el login en si
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session(
    [username, password],
    () => {
      cy.visit('/');
      cy.getByTestId('username').type(username);
      cy.getByTestId('password').type(password, { log: false });
      cy.getByTestId('login-button').click();
      cy.url().should('include', '/inventory.html');
    },
    {
      validate() {
        cy.getCookie('session-username').should('exist');
      },
    },
  );
});
