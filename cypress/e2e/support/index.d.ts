declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to search a character by name
       * @example cy.searchCharacter('goku')
       */
      searchCharacter(name: string): Chainable<JQuery<HTMLElement>>;
    }
  }