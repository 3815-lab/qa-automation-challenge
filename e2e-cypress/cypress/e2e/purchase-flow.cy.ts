import { loginPage } from '../pages/LoginPage';
import { inventoryPage } from '../pages/InventoryPage';
import { cartPage } from '../pages/CartPage';
import { checkoutInfoPage } from '../pages/CheckoutInfoPage';
import { checkoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { checkoutCompletePage } from '../pages/CheckoutCompletePage';

describe('Flujo de compra', () => {
  it('compra dos productos hasta la confirmacion de la orden', () => {
    // login
    loginPage.visit();
    cy.fixture('users').then(({ standard }) => {
      loginPage.login(standard.username, standard.password);
    });
    inventoryPage.title().should('have.text', 'Products');

    cy.fixture('products').then((products) => {
      // agregar los dos productos
      products.forEach((product: { id: string }) => {
        inventoryPage.addToCart(product.id);
      });
      inventoryPage.cartBadge().should('have.text', '2');

      // ver el carrito
      inventoryPage.openCart();
      cy.url().should('include', '/cart.html');
      cartPage.items().should('have.length', 2);
      cartPage.itemNames().eq(0).should('have.text', products[0].name);
      cartPage.itemNames().eq(1).should('have.text', products[1].name);

      // formulario de compra
      cartPage.checkout();
      checkoutInfoPage.fillForm('Darwin', 'Velez', '170150').continue();

      // resumen
      cy.url().should('include', '/checkout-step-two.html');
      checkoutOverviewPage.items().should('have.length', 2);
      const subtotal = products[0].price + products[1].price;
      checkoutOverviewPage.subtotal().should('contain.text', subtotal.toFixed(2));

      // finalizar
      checkoutOverviewPage.finish();
      cy.url().should('include', '/checkout-complete.html');
      checkoutCompletePage
        .header()
        .invoke('text')
        .then((text) => {
          expect(text.toUpperCase()).to.eq('THANK YOU FOR YOUR ORDER!');
        });
    });
  });
});
