Cypress.Commands.add('searchCharacter', (name: string) => {
    cy.get('input[placeholder="Buscar personajes"]').clear().type(name);
  });