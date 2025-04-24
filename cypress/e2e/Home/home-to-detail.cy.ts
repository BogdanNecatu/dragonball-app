/// <reference types="cypress" />

describe('Character card → Character detail page', () => {
  it('should navigate to the detail page when clicking a character card and display the content', () => {
    // Visit the Home page
    cy.visit('/');

    // Ensure cards have loaded
    cy.get('[data-testid="character-card"]', { timeout: 8000 }).should('have.length.at.least', 1);

    // Click the first card (the entire card is a Link)
    cy.get('[data-testid="character-card"]').first().click();

    // Ensure URL has changed to /character/:id
    cy.url().should('include', '/character/');

    // Wait for the detail to load and be visible
    cy.get('[data-testid="character-description"]', { timeout: 8000 }).should('exist');

    // Confirm key content is shown (name or description, depending on structure)
    cy.get('[data-testid="character-name"]').should('exist');
  });
});
