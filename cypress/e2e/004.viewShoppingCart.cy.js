describe('View Cart', () => {
    let userData;
    let productData;

    beforeEach(() => {
        cy.fixture('user.json').then((data) => {
            userData = data; // Load user data from fixture
        });

        // Load product data from fixture
        cy.fixture('products.json').then((data) => {
            productData = data;
        });

        cy.visit('/'); // Visit the home page
    });

    it('Verify Products', () => {
        // Login with userData
        cy.loginUser(userData);

        cy.get('#cartur').should('be.visible').click().then(() => {
            cy.wait(3000); // Wait for the products to load
            cy.screenshot('Added_Products'); // Take a screenshot of the added products
            cy.get('h2').should('be.visible').and('contain.text', 'Products'); // Check if the header 'Products' is visible
            cy.get('h2').should('be.visible').and('contain.text', 'Total'); // Check if the header 'Total' is visible
            cy.get('#totalp').should('be.visible').and('not.be.empty'); // Check if the total price element is visible and not empty
            cy.get('button.btn.btn-success').should('exist').and('be.visible').and('have.text', 'Place Order'); // Check if the 'Place Order' button exists and is visible
            cy.get('.table-responsive').should('be.visible').and('not.be.empty'); // Check if the table is visible and not empty

            // Verify the structure of the table header (thead)
            cy.get('thead').should('exist').within(() => {
                cy.get('tr').should('exist'); // Check that there is at least one row within <thead>
                cy.get('th').should('have.length', 4); // Check that there are exactly 4 columns (headers)
                cy.get('th').eq(0).should('have.text', 'Pic'); // Check that the first header is 'Pic'
                cy.get('th').eq(1).should('have.text', 'Title'); // Check that the second header is 'Title'
                cy.get('th').eq(2).should('have.text', 'Price'); // Check that the third header is 'Price'
                cy.get('th').eq(3).should('have.text', 'x'); // Check that the fourth header is 'x'
            });

            // Verify the number and content of rows within tbody
            cy.get('tbody#tbodyid').find('tr').should('have.length', productData.length); // Check that there are exactly the same number of rows as products in productData

            productData.forEach((product) => {
                cy.get('tbody#tbodyid')
                    .find('tr')
                    .each(($row, index) => {
                        // Within each row ($row), access the <td> elements and verify their content
                        cy.wrap($row).within(() => {
                            cy.get('td').eq(1).invoke('text').then((text) => {
                                const titleText = text.trim();
                                if (titleText === product.title) {
                                    cy.get('td').eq(1).should('contain.text', product.title); // Check if the title matches
                                    cy.get('td').eq(2).should('contain.text', product.price.toString()); // Check if the price matches
                                    cy.get('td').eq(3).should('contain.text', 'Delete'); // Check if the delete link is present
                                }
                            });
                        });
                    });
            });
        });
    });

    it('Verify Total Price after Deleting a Product', () => {
        let totalPrice = 0;
        let deletedProductPrice = 0; // Variable to store the price of the deleted product
    
        // Login with userData
        cy.loginUser(userData);
    
        cy.get('#cartur').should('be.visible').click();
        cy.wait(3000); // Wait for the products to load in the cart

        // Select a specific product to delete (e.g., the second product)
        const productToDelete = productData[1]; // Change the index as needed
    
        // Iterate over each product in productData and calculate the total price
        productData.forEach((product) => {
            totalPrice += parseInt(product.price); // Assuming price is a string or number
        });
    
        // Verify that the total price element is visible and contains the initial total price
        cy.get('#totalp').should('be.visible').and('contain.text', totalPrice.toString());
    
        // Find and click the "Delete" link for the selected product
        cy.get('tbody#tbodyid')
            .contains('tr', productToDelete.title) // Find the row that contains the title of the product to delete
            .within(() => {
                cy.contains('Delete').click(); // Click the "Delete" link
            });
    
        // Store the price of the deleted product
        deletedProductPrice = parseInt(productToDelete.price);
    
        // Recalculate the totalPrice after deleting the product
        totalPrice -= deletedProductPrice;
    
        // Verify that the total price element now contains the new totalPrice after deletion
        cy.get('#totalp').should('be.visible').and('contain.text', totalPrice.toString());

        cy.wait(2000); // Wait for the updated product list to load
        // Verify the number and content of rows within tbody
        cy.get('tbody#tbodyid').find('tr').should('have.length', 2); // Verify that there are now 2 rows
        cy.screenshot('Final_Product_List'); // Take a screenshot of the final product list
    });
});
