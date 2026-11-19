import { loginPage } from '../pages/LoginPage';
import { inventoryPage } from '../pages/InventoryPage';

describe('Login', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('entra con el usuario standard y muestra el catalogo', () => {
    cy.fixture('users').then(({ standard }) => {
      loginPage.login(standard.username, standard.password);

      cy.url().should('include', '/inventory.html');
      inventoryPage.title().should('have.text', 'Products');
      inventoryPage.productList().should('be.visible');
    });
  });
});
