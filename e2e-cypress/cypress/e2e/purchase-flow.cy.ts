import users from '../fixtures/users.json';
import productsToBuy from '../fixtures/products.json';
import customer from '../fixtures/checkout.json';
import {
  loginPage,
  inventoryPage,
  cartPage,
  checkoutInfoPage,
  checkoutOverviewPage,
  checkoutCompletePage,
} from '../pages';
import type { Product } from '../support/types';
import { formatPrice, parsePrice, sumAmounts, sumPrices, textsOf } from '../support/utils';

describe('Flujo de compra', () => {
  const products: Product[] = productsToBuy;
  const productNames = products.map(({ name }) => name);
  const productPrices = products.map(({ price }) => formatPrice(price));
  const subtotal = sumPrices(products);

  it('compra dos productos hasta la confirmacion de la orden', () => {
    cy.log('**Login**');
    loginPage.visit().login(users.standard.username, users.standard.password);
    inventoryPage.title().should('have.text', 'Products');

    cy.log('**Agregar productos al carrito**');
    products.forEach(({ id }) => {
      inventoryPage.addToCart(id);
      inventoryPage.removeButton(id).should('be.visible');
    });
    inventoryPage.cartBadge().should('have.text', String(products.length));

    cy.log('**Visualizar el carrito**');
    inventoryPage.openCart();
    cy.url().should('include', '/cart.html');
    cartPage.title().should('have.text', 'Your Cart');
    cartPage.items().should('have.length', products.length);
    cartPage.itemNames().then(textsOf).should('deep.equal', productNames);
    cartPage.itemPrices().then(textsOf).should('deep.equal', productPrices);

    cy.log('**Formulario de compra**');
    cartPage.checkout();
    cy.url().should('include', '/checkout-step-one.html');
    checkoutInfoPage.fillForm(customer).continue();

    cy.log('**Resumen de la orden**');
    cy.url().should('include', '/checkout-step-two.html');
    checkoutOverviewPage.itemNames().then(textsOf).should('deep.equal', productNames);
    checkoutOverviewPage.subtotal().should('contain.text', formatPrice(subtotal));
    // el total debe ser subtotal + impuesto, sin amarrar el test al % que use la pagina
    checkoutOverviewPage
      .tax()
      .invoke('text')
      .then((taxText) => {
        const expectedTotal = sumAmounts(subtotal, parsePrice(taxText));
        checkoutOverviewPage.total().should('contain.text', formatPrice(expectedTotal));
      });

    cy.log('**Finalizar compra**');
    checkoutOverviewPage.finish();
    cy.url().should('include', '/checkout-complete.html');
    // el enunciado pide "THANK YOU FOR YOUR ORDER", la pagina lo muestra como "Thank you for your order!"
    checkoutCompletePage.header().invoke('text').should('match', /^thank you for your order!?$/i);
    checkoutCompletePage.backHomeButton().should('be.visible');
    inventoryPage.cartBadge().should('not.exist');
  });
});
