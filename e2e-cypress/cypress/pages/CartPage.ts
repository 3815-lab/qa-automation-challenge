export class CartPage {
  private readonly selectors = {
    title: 'title',
    item: 'inventory-item',
    itemName: 'inventory-item-name',
    itemPrice: 'inventory-item-price',
    checkout: 'checkout',
    remove: (productId: string) => `remove-${productId}`,
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

  remove(productId: string): this {
    cy.getByTestId(this.selectors.remove(productId)).click();
    return this;
  }

  checkout(): this {
    cy.getByTestId(this.selectors.checkout).click();
    return this;
  }
}

export const cartPage = new CartPage();
