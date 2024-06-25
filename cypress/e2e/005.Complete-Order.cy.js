import { format, subMonths } from 'date-fns';

describe('Complete Order', () => {
    let userData;
    let productData;

    beforeEach(() => {
        cy.fixture('user.json').then((data) => {
            userData = data;
        });
        // Select products and load productData
        cy.fixture('products.json').then((data) => {
            productData = data;
        });
        cy.visit('/');
    });

    it('Confirmar Productos', () => {
        const today = new Date();
        const lastMonthDate = subMonths(today, 1);
        const formattedDate = format(lastMonthDate, 'dd/M/yyyy');
    
        // Login with userData
        cy.loginUser(userData);
        cy.get('#cartur').should('be.visible').click().then(() => {
            cy.wait(3000);
            cy.get('button.btn.btn-success').should('exist').and('be.visible').and('have.text', 'Place Order').click();
            cy.get('#orderModalLabel').should('be.visible');
            cy.get('#totalm').should('be.visible');
            cy.get('#name').should('be.visible').click().type(userData.name);
            cy.get('#country').should('be.visible').click().type(userData.country);
            cy.get('#city').should('be.visible').click().type(userData.city);
            cy.get('#card').should('be.visible').click().type(userData.card);
            cy.get('#month').should('be.visible').click().type(userData.month);
            cy.get('#year').should('be.visible').click().type(userData.year);
            cy.contains('Purchase').click().then(() => {
                cy.get('.sweet-alert').should('be.visible');
                cy.get('.sweet-alert > h2').should('be.visible');
                cy.get('p.lead.text-muted').should('be.visible').and('not.be.empty');
                cy.get('p.lead.text-muted').should('contain.text', `Date: ${formattedDate.split('/').join('/')}`);
                cy.get('p.lead.text-muted').should('contain.text', `Card Number: ${userData.card}`);
                cy.get('p.lead.text-muted').should('contain.text', `Name: ${userData.name}`);
                cy.get('.confirm').click();
                cy.wait(1000);
            });
        });
    });
    
})