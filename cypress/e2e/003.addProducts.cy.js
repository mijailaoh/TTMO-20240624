describe('Register and Login', () => {
    let userData;
    let productData;

    beforeEach(() => {
        cy.fixture('user.json').then((data) => {
            userData = data;
        });
        // Select products and load productData
        cy.selectProducts().then((products) => {
            productData = products;
        });
        cy.visit('/');
    });

    it('Agregar Productos', () => {
        // Login with userData y commands
        cy.loginUser(userData);

        // Iterate over each product in productData
        productData.forEach((product) => {
            // Find and click on items that match the current product category
            cy.get('.list-group .list-group-item').should('be.visible').each(($item) => {
                cy.wrap($item).invoke('text').then((text) => {
                    const category = text.trim(); // Get the category name of the item
                    // Check if the category matches the current product category
                    if (category === product.category) {
                        cy.wrap($item).click().then(() => {
                            cy.wait(3000);
                            cy.log(`Clic en el producto: ${product.title}`);
                            cy.get('#tbodyid .card-block .card-title a[href]').each(($el) => {
                                const hrefValue = $el.attr('href');

                                if (hrefValue.includes(`idp_=${product.id}`)) {
                                    cy.wrap($el).click().then(() => {
                                        cy.wait(3000);
                                        cy.get('.name').should('be.visible').invoke('text').should('include', product.title);
                                        cy.get('.price-container').should('be.visible').invoke('text').should('include', `${product.price} *includes tax`);
                                        cy.get('#myTabContent').should('be.visible').and('not.be.empty');
                                        cy.get('.item > img').should('be.visible')
                                        cy.get('.col-sm-12 > .btn').click();
                                        cy.get('#nava').click()
                                    })
                                    return false
                                }
                            });
                            return false
                        });
                    }
                });
            });
            return false
        });
    });
});
