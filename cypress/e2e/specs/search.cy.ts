describe('Character search feature', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should display characters matching the search term "goku"', () => {
      // ✅ Use the custom command instead of typing it manually
      cy.searchCharacter('goku');
  
      // Check that at least one result appears
      cy.get('[data-testid="character-card"]').should('have.length.at.least', 1);
  
      // Confirm that Goku appears in the results
      cy.contains(/goku/i).should('exist');
    });
  });
  