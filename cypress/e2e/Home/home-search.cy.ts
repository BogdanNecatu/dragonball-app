/// <reference types="cypress" />

describe('Character search on Home page', () => {
  // Runs before each test - ensures we are on the Home page
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display characters related to the "goku" search', () => {
    // Type "goku" in the search input
    cy.get('input[placeholder="SEARCH A CHARACTER..."]').type('goku');

    // Check that at least one character card appears
    cy.get('[data-testid="character-card"]').should('have.length.at.least', 1);

    // Check that the name "Goku" appears on the page
    cy.contains(/goku/i).should('exist');
  });
});
