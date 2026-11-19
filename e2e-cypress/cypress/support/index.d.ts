/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /** Busca un elemento por su atributo data-test */
    getByTestId(
      testId: string,
      options?: Partial<Loggable & Timeoutable & Withinable & Shadow>,
    ): Chainable<JQuery<HTMLElement>>;

    /** Inicia sesion por UI y reutiliza la sesion entre tests */
    login(username: string, password: string): Chainable<void>;
  }
}
