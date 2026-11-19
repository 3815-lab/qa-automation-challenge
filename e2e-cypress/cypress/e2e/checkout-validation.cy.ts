import users from '../fixtures/users.json';
import productsToBuy from '../fixtures/products.json';
import customer from '../fixtures/checkout.json';
import { inventoryPage, cartPage, checkoutInfoPage } from '../pages';
import type { CheckoutInfo } from '../support/types';

interface ValidationCase {
  missingField: keyof CheckoutInfo;
  expectedError: string;
}

describe('Validaciones del formulario de compra', () => {
  const [product] = productsToBuy;

  const cases: ValidationCase[] = [
    { missingField: 'firstName', expectedError: 'Error: First Name is required' },
    { missingField: 'lastName', expectedError: 'Error: Last Name is required' },
    { missingField: 'postalCode', expectedError: 'Error: Postal Code is required' },
  ];

  beforeEach(() => {
    // aca el login no es lo que se prueba, se reutiliza la sesion
    cy.login(users.standard.username, users.standard.password);
    inventoryPage.visit().addToCart(product.id).openCart();
    cartPage.checkout();
  });

  cases.forEach(({ missingField, expectedError }) => {
    it(`no avanza si falta el campo ${missingField}`, () => {
      checkoutInfoPage.fillForm({ ...customer, [missingField]: '' }).continue();

      checkoutInfoPage.errorMessage().should('have.text', expectedError);
      cy.url().should('include', '/checkout-step-one.html');
    });
  });
});
