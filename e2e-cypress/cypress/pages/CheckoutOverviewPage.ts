export class CheckoutOverviewPage {
  private readonly selectors = {
    item: 'inventory-item',
    itemName: 'inventory-item-name',
    subtotal: 'subtotal-label',
    tax: 'tax-label',
    total: 'total-label',
    finish: 'finish',
  };

  items() {
    return cy.getByTestId(this.selectors.item);
  }

  itemNames() {
    return cy.getByTestId(this.selectors.itemName);
  }

  subtotal() {
    return cy.getByTestId(this.selectors.subtotal);
  }

  tax() {
    return cy.getByTestId(this.selectors.tax);
  }

  total() {
    return cy.getByTestId(this.selectors.total);
  }

  finish(): this {
    cy.getByTestId(this.selectors.finish).click();
    return this;
  }
}

export const checkoutOverviewPage = new CheckoutOverviewPage();
