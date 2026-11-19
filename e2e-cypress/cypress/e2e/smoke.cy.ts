describe('Smoke', () => {
  it('carga la pagina de login', () => {
    cy.visit('/');
    cy.getByTestId('username').should('be.visible');
    cy.getByTestId('password').should('be.visible');
    cy.getByTestId('login-button').should('be.visible');
  });

  it('el comando login deja la sesion iniciada', () => {
    cy.fixture('users').then(({ standard }) => {
      cy.login(standard.username, standard.password);
      cy.visit('/inventory.html', { failOnStatusCode: false });
      cy.getByTestId('inventory-list').should('be.visible');
    });
  });
});
