/// <reference types="cypress" />

describe('Favorite counter and card count match', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should match the favorite count in the header with the number of cards on the page', () => {
    // Search and favorite a character (e.g., Goku)
    cy.get('input[placeholder="SEARCH A CHARACTER..."]').type('goku');
    cy.wait(400);
    cy.get('[data-testid^="favorite-toggle-"]').first().click();

    cy.visit('/');

    cy.get('input[placeholder="SEARCH A CHARACTER..."]').type('freezer');
    cy.wait(400);
    cy.get('[data-testid^="favorite-toggle-"]').first().click();

    // Go to favorites page
    cy.visit('/favorites');

    // Get the number of character cards displayed
    cy.get('[data-testid="character-card"]').then((cards) => {
      const cardCount = cards.length;

      // Get the number from the header
      cy.get('[data-testid="favorites-counter"]')
        .invoke('text')
        .then((text) => {
          const headerCount = parseInt(text.trim(), 10);
          expect(headerCount).to.eq(cardCount);
        });
    });
  });
});
