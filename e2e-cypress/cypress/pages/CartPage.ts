export class CartPage {
  title() {
    return cy.getByTestId('title');
  }

  items() {
    return cy.get('.cart_item');
  }

  itemNames() {
    return cy.get('.cart_item .inventory_item_name');
  }

  checkout(): this {
    cy.get('#checkout').click();
    return this;
  }
}

export const cartPage = new CartPage();
