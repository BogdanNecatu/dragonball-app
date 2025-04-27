/// <reference types="cypress" />

describe('Navigation to favorites page from header', () => {
  it('should navigate to /favorites when clicking the favorite icon in the header', () => {
    // Visit the Home page
    cy.visit('/');

    cy.get('input[placeholder="SEARCH A CHARACTER..."]').type('goku');
    cy.wait(400);
    cy.get('[data-testid^="favorite-toggle-"]').first().click();

    // Click the favorite icon in the header (assumed to have data-testid)
    cy.get('[data-testid="favorites-counter"]').click();

    // URL should now include /favorites
    cy.url().should('include', '/favorites');

    // The favorites page should show a recognizable element
    cy.get('h1').should('contain.text', 'FAVORITES');

    // Optional: ensure the grid or message is present
    cy.get('[data-testid="favorites-name"]').should('contain.text', 'FAVORITES');

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

    cy.searchCharacter('goku');
  });
});
