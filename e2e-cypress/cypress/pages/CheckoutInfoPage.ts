import type { CheckoutInfo } from '../support/types';

export class CheckoutInfoPage {
  private readonly selectors = {
    firstName: 'firstName',
    lastName: 'lastName',
    postalCode: 'postalCode',
    continue: 'continue',
    error: 'error',
  };

  /** Llena el formulario; los campos vacios se dejan sin tocar (cy.type no acepta string vacio) */
  fillForm(info: CheckoutInfo): this {
    const fields: (keyof CheckoutInfo)[] = ['firstName', 'lastName', 'postalCode'];

    fields
      .filter((field) => info[field] !== '')
      .forEach((field) => {
        cy.getByTestId(this.selectors[field]).type(info[field]);
      });
    return this;
  }

  continue(): this {
    cy.getByTestId(this.selectors.continue).click();
    return this;
  }

  errorMessage() {
    return cy.getByTestId(this.selectors.error);
  }
}

export const checkoutInfoPage = new CheckoutInfoPage();
