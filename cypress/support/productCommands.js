import { getProducts } from '../helpers/getProducts';

Cypress.Commands.add('selectProducts', () => {
    const products = getProducts();
    // Write newUser object to products.json file
    cy.writeFile('./cypress/fixtures/products.json', products);
    return cy.wrap(products);
});