/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    searchCharacter(name: string): Chainable<void>;
    assertResultCountMatchesCards(): Chainable<void>;
    favoriteCharacter(): Chainable<void>;
    favoriteCharacterByName(name: string): Chainable<void>;
    clickOnCharacterCard(name: string): Chainable<void>;
  }
}
