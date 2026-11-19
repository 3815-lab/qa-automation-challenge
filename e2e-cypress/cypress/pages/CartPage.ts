export class CartPage {
  private readonly selectors = {
    title: 'title',
    item: 'inventory-item',
    itemName: 'inventory-item-name',
    itemPrice: 'inventory-item-price',
    checkout: 'checkout',
  };

  title() {
    return cy.getByTestId(this.selectors.title);
  }

  items() {
    return cy.getByTestId(this.selectors.item);
  }

  itemNames() {
    return cy.getByTestId(this.selectors.itemName);
  }

  itemPrices() {
    return cy.getByTestId(this.selectors.itemPrice);
  }

  checkout(): this {
    cy.getByTestId(this.selectors.checkout).click();
    return this;
  }
}

export const cartPage = new CartPage();
