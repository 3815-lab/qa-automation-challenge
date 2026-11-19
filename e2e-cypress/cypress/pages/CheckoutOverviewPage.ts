export class CheckoutOverviewPage {
  items() {
    return cy.get('.cart_item');
  }

  subtotal() {
    return cy.getByTestId('subtotal-label');
  }

  total() {
    return cy.getByTestId('total-label');
  }

  finish(): this {
    cy.getByTestId('finish').click();
    return this;
  }
}

export const checkoutOverviewPage = new CheckoutOverviewPage();
