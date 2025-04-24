/// <reference types="cypress" />

describe('Character without transformations', () => {
  it('should show fallback message when no transformations are available', () => {
    cy.visit('/');

    // Known character without transformations
    cy.searchCharacter('krillin');

    //Click on the character
    cy.clickOnCharacterCard('krillin');

    // Wait for detail page to load
    cy.get('[data-testid="character-name"]').should('contain.text', 'KRILLIN');

    // Assert fallback message is shown
    cy.contains('This character has no recorded transformations.').should('be.visible');

    // Assert no transformation cards are rendered
    cy.get('[data-testid="transformation-card"]').should('not.exist');
  });
});
