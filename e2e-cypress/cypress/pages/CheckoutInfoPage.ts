import type { CheckoutInfo } from '../support/types';

export class CheckoutInfoPage {
  private readonly selectors = {
    firstName: 'firstName',
    lastName: 'lastName',
    postalCode: 'postalCode',
    continue: 'continue',
    error: 'error',
  };

  fillForm({ firstName, lastName, postalCode }: CheckoutInfo): this {
    cy.getByTestId(this.selectors.firstName).type(firstName);
    cy.getByTestId(this.selectors.lastName).type(lastName);
    cy.getByTestId(this.selectors.postalCode).type(postalCode);
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
