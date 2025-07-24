class PokemonAPI {
    // Base URL
    baseUrl = 'https://pokeapi.co/api/v2/';
    
    // API Methods
    getBaseUrl() {
        return cy.api({
            url: this.baseUrl,
            failOnStatusCode: false
        }).as('baseUrl');
    }
    
    getAbilityById(id) {
        return cy.api({
            method: 'GET',
            url: `${this.baseUrl}ability/${id}`
        });
    }
    
    getNonExistentAbility(id = 9999) {
        return cy.api({
            method: 'GET',
            url: `${this.baseUrl}ability/${id}`,
            failOnStatusCode: false
        });
    }
    
    getPokemonById(id) {
        return cy.api({
            method: 'GET',
            url: `${this.baseUrl}pokemon/${id}`
        });
    }
    
    getAbilitiesWithPagination(limit = 5, offset = 10) {
        return cy.api({
            method: 'GET',
            url: `${this.baseUrl}ability?limit=${limit}&offset=${offset}`
        });
    }
    
    getTypeById(id) {
        return cy.api({
            method: 'GET',
            url: `${this.baseUrl}type/${id}`
        });
    }
    
    getInvalidEndpoint(endpoint = 'invalid_endpoint') {
        return cy.api({
            method: 'GET',
            url: `${this.baseUrl}${endpoint}`,
            failOnStatusCode: false
        });
    }
    
    // Assertion Methods
    verifyAbilityResponse(response, expectedName) {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(expectedName);
        expect(response.body).to.have.property('effect_entries');
        return this;
    }
    
    verifyNotFoundResponse(response) {
        expect(response.status).to.eq(404);
        return this;
    }
    
    verifyPokemonResponse(response, expectedName) {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(expectedName);
        expect(response.body).to.have.property('abilities');
        expect(response.body).to.have.property('stats');
        return this;
    }
    
    verifyPaginationResponse(response, expectedCount) {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('results');
        expect(response.body.results).to.have.length(expectedCount);
        return this;
    }
    
    verifyTypeResponse(response, expectedName) {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(expectedName);
        expect(response.body).to.have.property('damage_relations');
        expect(response.body).to.have.property('pokemon');
        expect(response.body).to.have.property('moves');
        return this;
    }
    
    verifyBadRequestResponse(response) {
        expect(response.status).to.eq(400);
        return this;
    }
}

export default new PokemonAPI();