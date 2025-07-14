describe('pokemon', () => {
    it('valid request', () => {
        cy.api({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/',
        failOnStatusCode: false
    }).then(response => {
        Cypress.env('response', response);
    });
    })
})