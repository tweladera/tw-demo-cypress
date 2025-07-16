describe('Pokemon GO API Tests', () => {
  beforeEach(() => {
    // Set up base URL for all tests
    cy.api({
      url: 'https://pokeapi.co/api/v2/',
      failOnStatusCode: false
    }).as('baseUrl');
  });

  it('GET - Should retrieve ability information by ID', () => {
    cy.api({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/ability/1'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('stench');
      expect(response.body).to.have.property('effect_entries');
    });
  });

  it('GET - Should handle non-existent ability ID', () => {
    cy.api({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/ability/9999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('GET - Should retrieve Pokemon information by ID', () => {
    cy.api({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon/25'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('pikachu');
      expect(response.body).to.have.property('abilities');
      expect(response.body).to.have.property('stats');
    });
  });

  it('GET - Should retrieve abilities with pagination', () => {
    cy.api({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/ability?limit=5&offset=10'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('results');
      expect(response.body.results).to.have.length(5);
    });
  });

  it('GET - Should retrieve detailed type information by ID with all required properties', () => {
    cy.api({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/type/13'
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('electric');
      expect(response.body).to.have.property('damage_relations');
      expect(response.body).to.have.property('pokemon');
      expect(response.body).to.have.property('moves');
    });
  });

  it('GET - Should handle invalid endpoint request', () => {
    cy.api({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/invalid_endpoint',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});