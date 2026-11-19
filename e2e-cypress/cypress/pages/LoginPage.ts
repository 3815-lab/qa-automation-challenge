export class LoginPage {
  private readonly selectors = {
    username: 'username',
    password: 'password',
    loginButton: 'login-button',
    error: 'error',
  };

  visit(): this {
    cy.visit('/');
    return this;
  }

  login(username: string, password: string): this {
    cy.getByTestId(this.selectors.username).clear().type(username);
    cy.getByTestId(this.selectors.password).clear().type(password, { log: false });
    cy.getByTestId(this.selectors.loginButton).click();
    return this;
  }

  errorMessage() {
    return cy.getByTestId(this.selectors.error);
  }
}

export const loginPage = new LoginPage();
