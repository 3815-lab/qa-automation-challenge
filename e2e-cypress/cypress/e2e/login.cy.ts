import users from '../fixtures/users.json';
import { loginPage, inventoryPage } from '../pages';

describe('Login', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('entra con el usuario standard y muestra el catalogo', () => {
    loginPage.login(users.standard.username, users.standard.password);

    cy.url().should('include', '/inventory.html');
    inventoryPage.title().should('have.text', 'Products');
    inventoryPage.productList().should('be.visible');
  });

  it('no deja entrar a un usuario bloqueado', () => {
    loginPage.login(users.lockedOut.username, users.lockedOut.password);

    loginPage.errorMessage().should('contain.text', 'Sorry, this user has been locked out.');
    cy.url().should('not.include', '/inventory.html');
  });

  it('no deja entrar con un password incorrecto', () => {
    loginPage.login(users.standard.username, 'password_que_no_es');

    loginPage
      .errorMessage()
      .should('contain.text', 'Username and password do not match any user in this service');
    cy.url().should('not.include', '/inventory.html');
  });

  const requiredFieldCases = [
    { name: 'el username', username: '', password: users.standard.password, expectedError: 'Username is required' },
    { name: 'el password', username: users.standard.username, password: '', expectedError: 'Password is required' },
  ];

  requiredFieldCases.forEach(({ name, username, password, expectedError }) => {
    it(`no deja entrar si falta ${name}`, () => {
      loginPage.login(username, password);

      loginPage.errorMessage().should('contain.text', expectedError);
      cy.url().should('not.include', '/inventory.html');
    });
  });
});

describe('Control de acceso sin sesion', () => {
  ['/inventory.html', '/cart.html', '/checkout-step-one.html'].forEach((path) => {
    it(`redirige al login al entrar directo a ${path}`, () => {
      // la ruta directa responde 404 (hosting estatico) pero la app carga y hace la redireccion
      cy.visit(path, { failOnStatusCode: false });

      cy.location('pathname').should('eq', '/');
      loginPage
        .errorMessage()
        .should('contain.text', `You can only access '${path}' when you are logged in.`);
    });
  });
});
