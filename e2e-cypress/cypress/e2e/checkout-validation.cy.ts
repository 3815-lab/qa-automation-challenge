import users from '../fixtures/users.json';
import productsToBuy from '../fixtures/products.json';
import customer from '../fixtures/checkout.json';
import { inventoryPage, cartPage, checkoutInfoPage } from '../pages';
import type { CheckoutInfo } from '../support/types';

interface ValidationCase {
  name: string;
  info: CheckoutInfo;
  expectedError: string;
}

describe('Validaciones del formulario de compra', () => {
  const [product] = productsToBuy;
  const emptyForm: CheckoutInfo = { firstName: '', lastName: '', postalCode: '' };

  const cases: ValidationCase[] = [
    {
      name: 'falta el nombre',
      info: { ...customer, firstName: '' },
      expectedError: 'Error: First Name is required',
    },
    {
      name: 'falta el apellido',
      info: { ...customer, lastName: '' },
      expectedError: 'Error: Last Name is required',
    },
    {
      name: 'falta el codigo postal',
      info: { ...customer, postalCode: '' },
      expectedError: 'Error: Postal Code is required',
    },
    {
      // con todo vacio solo se reporta el primer campo, no los tres
      name: 'el formulario va vacio',
      info: emptyForm,
      expectedError: 'Error: First Name is required',
    },
  ];

  beforeEach(() => {
    // aca el login no es lo que se prueba, se reutiliza la sesion
    cy.login(users.standard.username, users.standard.password);
    inventoryPage.visit().addToCart(product.id).openCart();
    cartPage.checkout();
  });

  cases.forEach(({ name, info, expectedError }) => {
    it(`no avanza si ${name}`, () => {
      checkoutInfoPage.fillForm(info).continue();

      checkoutInfoPage.errorMessage().should('have.text', expectedError);
      cy.url().should('include', '/checkout-step-one.html');
    });
  });
});
