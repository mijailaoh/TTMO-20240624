import { idRandom } from '../helpers/utils';

describe('Register and Login', () => {
    let userData;

    before(() => {
        const id = idRandom();
        const newUser = {
            username: `mijail.${id}@gmail.com`,
            password: 'a123456B',
            name: 'Mijail Osorio',
            country: 'Ecuador',
            city: 'Quito',
            card: '1025-4785-9636-3570',
            month: 11,
            year: 2025
        };

        // Write newUser object to user.json file
        cy.writeFile('./cypress/fixtures/user.json', newUser);

        // Read and assert the content of user.json
        cy.readFile('./cypress/fixtures/user.json').then((user) => {
            expect(user.username).to.equal(newUser.username);
            expect(user.password).to.equal(newUser.password);
        });
    })

    beforeEach(() => {
        // Load userData from user.json fixture
        cy.fixture('user.json').then((data) => {
            userData = data;
        });
        cy.visit('/');
    });

    it('Register New User', () => {
        cy.get('#signin2').should('be.visible').click();
        cy.get('#signInModalLabel').should('be.visible').should('have.text', 'Sign up');
        cy.get('button.btn.btn-secondary[data-dismiss="modal"]').eq(1).should('exist').and('have.text', 'Close').and('have.attr', 'type', 'button');
        // Verify and enter username
        cy.get('label[for="sign-username"].form-control-label').should('have.text', 'Username:');
        cy.get('label[for="sign-password"].form-control-label').should('have.text', 'Password:');
        cy.wait(1000);
        cy.get('#sign-username').should('be.visible').type(userData.username);
        // Verify and enter password
        cy.wait(1000);
        cy.get('#sign-password').should('be.visible').type(userData.password);

        // Verify sign-up button
        cy.get('button.btn.btn-primary').eq(1).should('be.visible').and('have.text', 'Sign up').click().then(() => {
            // Intercept request [signup]
            cy.intercept('POST', 'https://api.demoblaze.com/signup').as('signupRequest').then(()=>{
                cy.wait(1000);
                cy.wait('@signupRequest').its('response.statusCode').should('eq', 200);
            })
        });
    });

    it('Login && Logout', () => {
        cy.get('#login2').should('be.visible').click();
        cy.get('#logInModalLabel').should('be.visible').should('have.text', 'Log in');
        cy.get('label[for="sign-username"].form-control-label').should('have.text', 'Username:');
        cy.get('label[for="sign-password"].form-control-label').should('have.text', 'Password:');
        // Verify and enter username
        cy.wait(1000);
        cy.get('#loginusername').should('be.visible').type(userData.username);
        // Verify and enter password
        cy.wait(1000);
        cy.get('#loginpassword').should('be.visible').type(userData.password);
        // Verify Login button
        cy.contains('button', 'Log in').eq(0).click().then(() => {
            // Intercept request [login]
            cy.intercept('POST', 'https://api.demoblaze.com/login').as('signupRequest').then(()=>{
                cy.wait(1000);
                cy.wait('@signupRequest').its('response.statusCode').should('eq', 200);
            })
            // Verify user Name 
            cy.get('#nameofuser').should('be.visible').should('have.text', `Welcome ${userData.username}`);
            // Logout
            cy.get('#logout2').should('be.visible').should('have.text', 'Log out').click()
            cy.get('#nameofuser').should('not.be.visible');
        })
    })

});
