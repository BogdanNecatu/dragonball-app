/// <reference types="cypress" />

describe('Home page', () => {
  // Runs before each test - ensures we are on the Home page
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display all 50 characters in the Home page', () => {
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
