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

  // TODO: mover esto al spec del flujo de compra cuando esten listas las demas paginas
  it('agrega un producto y el badge del carrito se actualiza', () => {
    cy.fixture('users').then(({ standard }) => {
      loginPage.login(standard.username, standard.password);
    });

    cy.fixture('products').then(([firstProduct]) => {
      inventoryPage.addToCart(firstProduct.id);

      inventoryPage.cartBadge().should('have.text', '1');
      inventoryPage.removeButton(firstProduct.id).should('be.visible');
    });
  });
});
