describe('Ver carrito', () => {
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

    it('Verificar Productos', () => {
        // Login with userData
        cy.loginUser(userData);

        cy.get('#cartur').should('be.visible').click().then(() => {
            cy.wait(3000);
            cy.get('h2').should('be.visible').and('contain.text', 'Products');
            cy.get('h2').should('be.visible').and('contain.text', 'Total');
            cy.get('#totalp').should('be.visible').and('not.be.empty');
            cy.get('button.btn.btn-success').should('exist').and('be.visible').and('have.text', 'Place Order');
            cy.get('.table-responsive').should('be.visible').and('not.be.empty');

            // Verifica la estructura de la tabla (thead)
            cy.get('thead').should('exist').within(() => {
                cy.get('tr').should('exist'); // Verifica que haya al menos una fila dentro de <thead>
                cy.get('th').should('have.length', 4); // Verifica que haya exactamente 4 columnas (encabezados)
                cy.get('th').eq(0).should('have.text', 'Pic'); // Verifica que el primer encabezado sea 'Pic'
                cy.get('th').eq(1).should('have.text', 'Title'); // Verifica que el segundo encabezado sea 'Title'
                cy.get('th').eq(2).should('have.text', 'Price'); // Verifica que el tercer encabezado sea 'Price'
                cy.get('th').eq(3).should('have.text', 'x'); // Verifica que el cuarto encabezado sea 'x'
            });

            // Verifica la cantidad y contenido de las filas dentro de tbody
            cy.get('tbody#tbodyid').find('tr').should('have.length', productData.length); // Verifica que haya exactamente la misma cantidad de filas que productos en productData

            productData.forEach((product) => {

                cy.get('tbody#tbodyid')
                    .find('tr')
                    .each(($row, index) => {
                        // Dentro de cada fila ($row), accederemos a los elementos <td> y verificaremos su contenido
                        cy.wrap($row).within(() => {
                            cy.get('td').eq(1).invoke('text').then((text) => {
                                const titleText = text.trim();
                                if (titleText === product.title) {
                                    cy.get('td').eq(1).should('contain.text', product.title);
                                    cy.get('td').eq(2).should('contain.text', product.price.toString());
                                    cy.get('td').eq(3).should('contain.text', 'Delete');
                                }
                            });
                        });
                    });
            });
        });
    });

    it.only('Verificar Total Price después de eliminar un producto', () => {
        let totalPrice = 0;
        let deletedProductPrice = 0; // Variable para almacenar el precio del producto eliminado
    
        // Login with userData
        cy.loginUser(userData);
    
        cy.get('#cartur').should('be.visible').click();
        cy.wait(3000); // Esperar el tiempo necesario para que se carguen los productos en el carrito
    
        // Seleccionar un producto específico para eliminar (por ejemplo, el segundo producto)
        const productToDelete = productData[1]; // Cambia el índice según tu necesidad
    
        // Iterar sobre cada producto en productData y calcular la suma total de precios
        productData.forEach((product) => {
            totalPrice += parseInt(product.price); // Asumiendo que price es un número en formato string o número
        });
    
        // Verificar que el elemento #totalp esté visible y contenga el texto con la suma total de precios inicial
        cy.get('#totalp').should('be.visible').and('contain.text', totalPrice.toString());
    
        // Encontrar y hacer clic en el enlace "Delete" del producto seleccionado para eliminarlo
        cy.get('tbody#tbodyid')
            .contains('tr', productToDelete.title) // Buscar la fila que contiene el título del producto a eliminar
            .within(() => {
                cy.contains('Delete').click(); // Hacer clic en el enlace "Delete"
            });
    
        // Guardar el precio del producto eliminado
        deletedProductPrice = parseInt(productToDelete.price);
    
        // Recalcular el totalPrice después de eliminar el producto
        totalPrice -= deletedProductPrice;
    
        // Verificar que el elemento #totalp ahora contenga el nuevo totalPrice después de la eliminación
        cy.get('#totalp').should('be.visible').and('contain.text', totalPrice.toString());

        cy.wait(2000);
        // Verifica la cantidad y contenido de las filas dentro de tbody
        cy.get('tbody#tbodyid').find('tr').should('have.length', 2);
    });
    
});
