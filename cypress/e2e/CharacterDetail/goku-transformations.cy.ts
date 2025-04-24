/// <reference types="cypress" />

describe('Character detail - Goku (with transformations)', () => {
  it("should render Goku's detail page with valid transformation cards", () => {
    // Visit the home page
    cy.visit('/');

    // Use custom command to click on Goku's card
    cy.clickOnCharacterCard('goku');

    // Assert URL contains correct route
    cy.url().should('include', '/character/1');

    // Assert character detail name and transformation section exist
    cy.get('[data-testid="character-name"]').should('contain.text', 'GOKU');
    cy.get('[data-testid="transformation"]').should('contain.text', 'TRANSFORMATIONS');

    // Assert at least one transformation card with valid structure
    cy.get('[data-testid="transformation-card"]').should('have.length.at.least', 1);
    cy.get('[data-testid="transformation-card"]').each(($card) => {
      cy.wrap($card).contains(/goku/i).should('exist');
      cy.wrap($card).contains(/ki:/i).should('exist');
    });
  });
});
