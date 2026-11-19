/**
 * Test que documenta un bug conocido del sitio: afirma el comportamiento esperado, asi que hoy falla.
 * Por defecto queda como pendiente para no dejar la suite en rojo; con --expose knownBugs=true se ejecuta
 * y el dia que arreglen el bug pasa a verde.
 */
export const knownBugIt: Mocha.TestFunction | Mocha.PendingTestFunction = Cypress.expose('knownBugs')
  ? it
  : it.skip;
