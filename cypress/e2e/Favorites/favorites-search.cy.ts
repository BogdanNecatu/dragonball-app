/// <reference types="cypress" />

describe('Favorites', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should find favorite Goku and verify on favorites page', () => {
    cy.searchCharacter('goku');
    cy.favoriteCharacter();
    cy.visit('/favorites');
    cy.searchCharacter('goku');
    cy.assertResultCountMatchesCards();
  });
});
