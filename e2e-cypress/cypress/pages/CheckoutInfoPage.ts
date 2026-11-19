export class CheckoutInfoPage {
  fillForm(firstName: string, lastName: string, postalCode: string): this {
    cy.getByTestId('firstName').type(firstName);
    cy.getByTestId('lastName').type(lastName);
    cy.getByTestId('postalCode').type(postalCode);
    return this;
  }

  continue(): this {
    cy.getByTestId('continue').click();
    return this;
  }
}

export const checkoutInfoPage = new CheckoutInfoPage();
