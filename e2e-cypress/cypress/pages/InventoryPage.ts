export class InventoryPage {
  private readonly selectors = {
    title: 'title',
    list: 'inventory-list',
    cartBadge: 'shopping-cart-badge',
    cartLink: 'shopping-cart-link',
    addToCart: (productId: string) => `add-to-cart-${productId}`,
    remove: (productId: string) => `remove-${productId}`,
  };

  title() {
    return cy.getByTestId(this.selectors.title);
  }

  productList() {
    return cy.getByTestId(this.selectors.list);
  }

  addToCart(productId: string): this {
    cy.getByTestId(this.selectors.addToCart(productId)).click();
    return this;
  }

  removeButton(productId: string) {
    return cy.getByTestId(this.selectors.remove(productId));
  }

  cartBadge() {
    return cy.getByTestId(this.selectors.cartBadge);
  }

  openCart(): this {
    cy.getByTestId(this.selectors.cartLink).click();
    return this;
  }
}

export const inventoryPage = new InventoryPage();
