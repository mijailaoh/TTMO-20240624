describe('Demoblaze Tests', () => {
  it('Visits the Demoblaze home page', () => {
    cy.visit('/')
    cy.contains('PRODUCT STORE').should('be.visible')
  })

  it('Checks product list', () => {
    cy.visit('/')
    cy.get('.card-title').should('have.length.at.least', 1) // Asegura que al menos un producto esté listado
  })

  it('Adds a product to the cart', () => {
    cy.visit('/')
    cy.get('.card-title').first().click()
    cy.contains('Add to cart').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added')
    })
  })

  it('Navigates to the cart and verifies the product', () => {
    cy.visit('/')
    cy.get('.card-title').first().click()
    cy.contains('Add to cart').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added')
    })
    cy.get('#cartur').click()
    cy.get('.success').should('have.length.at.least', 1) // Asegura que al menos un producto esté en el carrito
  })
})
