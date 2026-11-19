import users from '../fixtures/users.json';
import productsToBuy from '../fixtures/products.json';
import { inventoryPage, cartPage } from '../pages';
import { knownBugIt } from '../support/known-bug';
import { textsOf } from '../support/utils';

describe('Carrito', () => {
  const [removed, kept] = productsToBuy;

  beforeEach(() => {
    cy.login(users.standard.username, users.standard.password);
    inventoryPage.visit();
  });

  it('quitar un producto actualiza la lista y el contador', () => {
    inventoryPage.addToCart(removed.id).addToCart(kept.id).openCart();
    cartPage.items().should('have.length', 2);

    cartPage.remove(removed.id);

    cartPage.itemNames().then(textsOf).should('deep.equal', [kept.name]);
    inventoryPage.cartBadge().should('have.text', '1');
  });

  // BUG: el sitio deja completar la compra sin productos, con total $0.00
  knownBugIt('no deberia permitir iniciar el checkout con el carrito vacio', () => {
    inventoryPage.openCart();
    cartPage.items().should('not.exist');

    cartPage.checkout();

    cy.url().should('include', '/cart.html');
  });
});
