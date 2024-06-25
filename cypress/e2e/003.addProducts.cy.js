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
                            cy.wait(1000);
                            cy.log(`Clic en el producto: ${product.title}`);

                            cy.get('#tbodyid .card-block .card-title').each(($titleElement, index, $titleElements) => {
                                // Get the title text and compare it with the product title
                                cy.wrap($titleElement).invoke('text').then((title) => {
                                    const trimmedTitle = title.trim();
                                    cy.log(`Texto del título obtenido: ${trimmedTitle}`);

                                    // If the title matches the current product, click on the item
                                    if (trimmedTitle === product.title) {
                                        cy.wrap($titleElement).click().then(() => {
                                            cy.wait(1000);
                                            cy.get('.name').should('be.visible').invoke('text').should('include', product.title);
                                            cy.get('.price-container').should('be.visible').invoke('text').should('include', `${product.price} *includes tax`);
                                            cy.get('#myTabContent').should('be.visible').and('not.be.empty');
                                            cy.get('.item > img').should('be.visible')
                                            cy.contains('Add to cart').click();
                                            cy.get('#nava').click()
                                        });
                                    }
                                });
                            });
                        });
                    }
                });
            });
            return false
        });
    });
});
