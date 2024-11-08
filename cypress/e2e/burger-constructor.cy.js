function dragBunToContainer(bunType) {
  cy.get('[class^=ingredient-card_card]')
      .contains('булка')
      .should('be.visible')
      .first()
      .as('bun');

  cy.get('@bun')
      .invoke('text')
      .then((bunName) => {
          cy.get('@bun').trigger('dragstart');
          
          const targetContainer = bunType === 'top'
              ? '[class*=burger-constructor_topBun]'
              : '[class*=burger-constructor_bottomBun]';

          cy.get(targetContainer)
              .should('be.visible')
              .trigger('drop');

          cy.get(targetContainer).should('contain', bunName);
      });
}

describe('openning modals is correctly', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3001');
  });
  
  it('should open modal with ingedient details', function() {
    cy.get('[class^=ingredient-card_card]').first().as('product')
    cy.get('@product').click();
    cy.contains('Детали ингредиента')
  });

  it('should drag a bun to the top bun container', function() {
      dragBunToContainer('top');
  });

  it('should drag a bun to the bottom bun container', function() {
      dragBunToContainer('bottom');
  });
}); 