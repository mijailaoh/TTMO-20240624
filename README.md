# TTMO-20240624

Prueba técnica desarrollada por Mijail Osorio utilizando Node.js.

## Instrucciones

1. Clone el repositorio o descomprima el archivo llamado `Mijail-Test.zip`.
2. Navegue hasta la carpeta raíz del proyecto o folder y ejecute el comando `npm install`.
3. Verifique que tenga instalado Newman; si no lo tiene instalado, puede hacerlo ejecutando el comando `npm install -g newman`.

## Run Test
1. Para Pruebas E2E ejecute el comando `npm start`
2. Para Pruebas API ejecute el comando `npm test`

# Detalle Prueba Técnica

Esta prueba técnica está dividida en dos partes:

### [01] Test E2E (End-to-End) con Cypress

Se utilizó Cypress para realizar pruebas E2E en el sitio [https://www.demoblaze.com/](https://www.demoblaze.com/).

#### Archivos de Pruebas:

1. **001.home.cy.js**
   - Verifica la página de inicio (Home Page).
   - Verifica el menú izquierdo.
   - Verifica la lista principal de productos.

2. **002.login.cy.js**
   - Registra un nuevo usuario.
   - Inicia sesión y cierra sesión.

3. **003.addProducts.cy.js**
   - blabla

4. **004.viewShoppingCart.cy.js**
   - blabla

5. **005.Complete-Order.cy.js**
   - blabla

### [02] Test API con Postman

Se utilizó Postman y Newman para desarrollar y ejecutar pruebas API.

#### Colección de Postman:

La colección de Postman contiene cuatro requests a [https://petstore.swagger.io](https://petstore.swagger.io).

1. **Add_New_Pet**
   - blabla

2. **Get_Pet_By_Id**
   - blabla

3. **Update_Pet**
   - blabla

4. **Get_Pet_By_Status**
   - blabla


