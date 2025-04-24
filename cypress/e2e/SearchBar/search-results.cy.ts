/// <reference types="cypress" />

describe('Search results match the number of visible cards', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should match result counter with visible cards when searching "g"', () => {
    // Type "g" in the search input
    cy.get('input[placeholder="SEARCH A CHARACTER..."]').clear().type('g');

    // Get result count from the dedicated counter
    cy.get('[data-testid="character-card"]', { timeout: 5000 }).should('have.length.greaterThan', 0);

    cy.get('[data-testid="result-count"]')
      .invoke('text')
      .then((text) => {
        cy.log('Text from result-count:', text);
        const numberMatch = text.match(/\d+/);
        const resultCount = numberMatch ? parseInt(numberMatch[0], 10) : 0;
        // Compare with number of visible cards
        cy.get('[data-testid="character-card"]').should('have.length', resultCount);
      });
  });
});
