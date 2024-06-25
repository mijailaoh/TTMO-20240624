describe('Prueba Tecnica', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Home Page Element', () => {
    cy.title().should('include', 'STORE')
    cy.contains('PRODUCT STORE').should('be.visible')
    cy.get('#carouselExampleIndicators').should('be.visible');
    cy.get('#navbarExample').should('be.visible');
    cy.get('#cartur').should('be.visible');
    cy.get('#login2').should('be.visible');
    cy.get('#signin2').should('be.visible');
  })

  it('Check Left Menu', () => {
    cy.get('.list-group .list-group-item').should('be.visible').each(($item) => {
      cy.wrap($item).invoke('text').then((text) => {
        switch (text.trim()) {
          case 'Phones':
            cy.wrap($item).should('have.text', 'Phones');
            break;
          case 'Laptops':
            cy.wrap($item).should('have.text', 'Laptops');
            break;
          case 'Monitors':
            cy.wrap($item).should('have.text', 'Monitors');
            break;
        }
      });
    });
  })

  it('Checks product list', () => {
    cy.get('#tbodyid').should('exist').each(($row) => {
      cy.wrap($row).find('.card.h-100').should('exist');
      cy.wrap($row).find('.card-block').should('exist');
      cy.wrap($row).find('.card-block > .card-title').should('exist').and('not.be.empty');
      cy.wrap($row).find('.card-block > #article').should('exist').and('not.be.empty');
    });
  })
})
