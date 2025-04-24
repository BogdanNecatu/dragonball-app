/// <reference types="cypress" />

describe('Character detail - transformation rendering (generic)', () => {
  it('should display transformation cards or fallback message based on character data', () => {
    cy.visit('/');

    // Ensure at least one character card is loaded
    cy.get('[data-testid="character-card"]', { timeout: 8000 }).should('have.length.at.least', 1);

    // Click the first character card (could be with or without transformations)
    cy.get('[data-testid="character-card"]').first().click();

    // Wait for detail view to load
    cy.get('[data-testid="character-name"]').should('exist');
    cy.get('[data-testid="character-description"]').should('exist');

    // Check if transformations exist in the DOM
    cy.get('body').then(($body) => {
      const hasTransformations = $body.find('[data-testid="transformation-card"]').length > 0;

      if (hasTransformations) {
        // Validate structure of each transformation card
        cy.contains('TRANSFORMATIONS').should('exist');
        cy.get('[data-testid="transformation-card"]').should('have.length.at.least', 1);
        cy.get('[data-testid="transformation-card"]').each(($card) => {
          cy.wrap($card).find('[data-testid="transformation-name"]').should('exist');
          cy.wrap($card).find('[data-testid="transformation-ki"]').should('contain.text', 'Ki:');
          cy.wrap($card).find('img').scrollIntoView().should('be.visible');
        });
      } else {
        // Fallback message for characters without transformations
        cy.contains('This character has no recorded transformations.').should('exist');
        cy.get('[data-testid="transformation-card"]').should('not.exist');
      }
    });
  });
});
