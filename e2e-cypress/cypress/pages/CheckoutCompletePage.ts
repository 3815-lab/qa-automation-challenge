export class CheckoutCompletePage {
  private readonly selectors = {
    header: 'complete-header',
    backHome: 'back-to-products',
  };

  header() {
    return cy.getByTestId(this.selectors.header);
  }

  backHomeButton() {
    return cy.getByTestId(this.selectors.backHome);
  }
}

export const checkoutCompletePage = new CheckoutCompletePage();
