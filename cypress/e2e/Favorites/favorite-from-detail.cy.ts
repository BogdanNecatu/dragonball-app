/// <reference types="cypress" />

describe('Favorite character from detail page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should toggle favorite from character detail page and update the header count', () => {
    // Click the first character card to go to its detail page
    cy.get('[data-testid="character-card"]').first().click();

    // Wait for detail content to render
    cy.get('[data-testid="character-name"]').should('exist');

    // Capture current favorite count from the header
    cy.get('header')
      .find('[data-testid="favorites-counter"]')
      .invoke('text')
      .then((initialCount) => {
        const initial = parseInt(initialCount);

        // Toggle favorite (click heart)
        cy.get('[data-testid^="favorite-toggle-"]').first().click();

        // Count should increase by 1
        cy.get('header')
          .find('[data-testid="favorites-counter"]')
          .invoke('text')
          .should((updatedCount) => {
            const updated = parseInt(updatedCount);
            expect(updated).to.eq(initial + 1);
          });

        // Click again to unfavorite
        cy.get('[data-testid^="favorite-toggle-"]').first().click();

        // Count should go back to original
        cy.get('header')
          .find('[data-testid="favorites-counter"]')
          .invoke('text')
          .should((finalCount) => {
            const final = parseInt(finalCount);
            expect(final).to.eq(initial);
          });
      });
  });
});
