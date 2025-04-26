/// <reference types="cypress" />

/**
 * Search for a character by name in the input field
 * @param name Name of the character to search
 */
Cypress.Commands.add('searchCharacter', (name: string) => {
  cy.get('input[placeholder="SEARCH A CHARACTER..."]').clear().type(name);
});

/**
 * Assert that the number of result cards matches the result counter
 */
Cypress.Commands.add('assertResultCountMatchesCards', () => {
  cy.get('[data-testid="result-count"]')
    .invoke('text')
    .then((text) => {
      const match = text.match(/\d+/);
      const count = match ? parseInt(match[0], 10) : 0;
      cy.get('[data-testid="character-card"]').should('have.length', count);
    });
});

/**
 * Mark a character as favorite by its visible name
 * @param name Name of the character to favorite
 */
Cypress.Commands.add('favoriteCharacterByName', (name: string) => {
  cy.contains('[data-testid="character-card"]', name).find('[data-testid^="favorite-toggle-"]').click();
});

/**
 * Mark the first visible character as favorite
 */
Cypress.Commands.add('favoriteCharacter', () => {
  cy.get('[data-testid^="favorite-toggle-"]').first().click();
});

/**
 * Clicks on the character card by character name.
 * This command scrolls the card into view, ensures it's clickable,
 * and avoids interference with the favorite button.
 *
 * @param characterName - The visible name of the character to click on
 */
Cypress.Commands.add('clickOnCharacterCard', (characterName: string) => {
  cy.log(`Clicking on character card: ${characterName}`);

  cy.get('[data-testid="character-card-name"]')
    .contains(characterName, { matchCase: false })
    .scrollIntoView()
    .closest('[data-testid="character-card"]')
    .click();
});
