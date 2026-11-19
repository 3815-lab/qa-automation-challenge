export class CheckoutCompletePage {
  header() {
    return cy.getByTestId('complete-header');
  }

  backHomeButton() {
    return cy.getByTestId('back-to-products');
  }
}

export const checkoutCompletePage = new CheckoutCompletePage();
