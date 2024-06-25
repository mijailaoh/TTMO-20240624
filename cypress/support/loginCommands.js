Cypress.Commands.add('loginUser', (userData) => {
    cy.get('#login2').should('be.visible').click();
    cy.wait(500);
    cy.get('#loginusername').should('be.visible').type(userData.username);
    cy.wait(500);
    cy.get('#loginpassword').should('be.visible').type(userData.password);
    cy.contains('button', 'Log in').eq(0).click().then(() => {
        cy.get('#nameofuser').should('be.visible').should('have.text', `Welcome ${userData.username}`);
    })
});