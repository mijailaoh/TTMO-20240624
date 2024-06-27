import { format, subMonths } from 'date-fns';

describe('Complete Order', () => {
    let userData;
    let productData;

    beforeEach(() => {
        // Load user data from fixture
        cy.fixture('user.json').then((data) => {
            userData = data;
        });

        // Load product data from fixture
        cy.fixture('products.json').then((data) => {
            productData = data;
        });

        cy.visit('/'); // Visit the home page
    });

    it('Confirm Products', () => {
        // Calculate last month's date and format it
        const today = new Date();
        const lastMonthDate = subMonths(today, 1);
        const formattedDate = format(lastMonthDate, 'dd/M/yyyy');
    
        // Login with userData
        cy.loginUser(userData);

        cy.get('#cartur').should('be.visible').click().then(() => {
            cy.wait(3000); // Wait for the cart to load

            // Click on 'Place Order' button and proceed to order confirmation
            cy.get('button.btn.btn-success').should('exist').and('be.visible').and('have.text', 'Place Order').click();

            // Verify elements in the order modal
            cy.get('#orderModalLabel').should('be.visible'); // Check if the order modal is visible
            cy.get('#totalm').should('be.visible'); // Check if the total amount is visible

            // Fill in order details
            cy.get('#name').should('be.visible').click().type(userData.name); // Fill in name
            cy.get('#country').should('be.visible').click().type(userData.country); // Fill in country
            cy.get('#city').should('be.visible').click().type(userData.city); // Fill in city
            cy.get('#card').should('be.visible').click().type(userData.card); // Fill in card number
            cy.get('#month').should('be.visible').click().type(userData.month); // Fill in card expiry month
            cy.get('#year').should('be.visible').click().type(userData.year); // Fill in card expiry year

            // Click on 'Purchase' button and verify the confirmation message
            cy.contains('Purchase').click().then(() => {
                cy.get('.sweet-alert').should('be.visible'); // Check if the confirmation alert is visible
                cy.get('.sweet-alert > h2').should('be.visible'); // Check if the confirmation message header is visible
                cy.get('p.lead.text-muted').should('be.visible').and('not.be.empty'); // Check if the lead text is visible and not empty

                // Verify the details in the confirmation message
                cy.get('p.lead.text-muted').should('contain.text', `Date: ${formattedDate.split('/').join('/')}`); // Verify the order date
                cy.get('p.lead.text-muted').should('contain.text', `Card Number: ${userData.card}`); // Verify the card number
                cy.get('p.lead.text-muted').should('contain.text', `Name: ${userData.name}`); // Verify the name

                // Click on the 'Confirm' button in the confirmation message
                cy.get('.confirm').click();
                cy.wait(1000); // Wait for any post-action delay
            });
        });
    });
});
