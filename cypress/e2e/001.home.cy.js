describe('Home Page', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  // Test to verify elements on the Home Page
  it('Home Page Element', () => {
    cy.title().should('include', 'STORE') // Check if the page title includes 'STORE'
    cy.contains('PRODUCT STORE').should('be.visible') // Check if 'PRODUCT STORE' text is visible
    cy.get('#carouselExampleIndicators').should('be.visible'); // Check if the carousel is visible
    cy.get('#navbarExample').should('be.visible'); // Check if the navbar is visible
    cy.get('#cartur').should('be.visible'); // Check if the cart icon is visible
    cy.get('#login2').should('be.visible'); // Check if the login button is visible
    cy.get('#signin2').should('be.visible'); // Check if the sign-up button is visible
  })

  // Test to verify the Left Menu items
  it('Check Left Menu', () => {
    cy.get('.list-group .list-group-item').should('be.visible').each(($item) => {
      cy.wrap($item).invoke('text').then((text) => {
        switch (text.trim()) {
          case 'Phones':
            cy.wrap($item).should('have.text', 'Phones'); // Check if the item text is 'Phones'
            break;
          case 'Laptops':
            cy.wrap($item).should('have.text', 'Laptops'); // Check if the item text is 'Laptops'
            break;
          case 'Monitors':
            cy.wrap($item).should('have.text', 'Monitors'); // Check if the item text is 'Monitors'
            break;
        }
      });
    });
  })

  // Test to verify the Product List
  it('Checks Product List', () => {
    cy.get('#tbodyid').should('exist').each(($row) => {
      cy.wrap($row).find('.card.h-100').should('exist'); // Check if the card element exists
      cy.wrap($row).find('.card-block').should('exist'); // Check if the card block element exists
      cy.wrap($row).find('.card-block > .card-title').should('exist').and('not.be.empty'); // Check if the card title exists and is not empty
      cy.wrap($row).find('.card-block > #article').should('exist').and('not.be.empty'); // Check if the article element exists and is not empty
    });
  })
})
