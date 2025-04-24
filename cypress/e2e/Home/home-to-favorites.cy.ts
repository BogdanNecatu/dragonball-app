/// <reference types="cypress" />

describe('Navigation to favorites page from header', () => {
  it('should navigate to /favorites when clicking the favorite icon in the header', () => {
    // Visit the Home page
    cy.visit('/');

    // Click the favorite icon in the header (assumed to have data-testid)
    cy.get('[data-testid="favorites-counter"]').click();

    // URL should now include /favorites
    cy.url().should('include', '/favorites');

    // The favorites page should show a recognizable element
    cy.get('h1').should('contain.text', 'FAVORITES');

    // Optional: ensure the grid or message is present
    cy.get('[data-testid="favorites-name"]').should('contain.text', 'FAVORITES');
  });
});
