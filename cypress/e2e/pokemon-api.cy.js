// Import API service
import { PokemonAPI } from '../support/services/';

describe('Pokemon GO API Tests', () => {
  beforeEach(() => {
    // Set up base URL for all tests
    PokemonAPI.getBaseUrl();
  });

  it('GET - Should retrieve ability information by ID', () => {
    PokemonAPI.getAbilityById(1).then((response) => {
      PokemonAPI.verifyAbilityResponse(response, 'stench');
    });
  });

  it('GET - Should handle non-existent ability ID', () => {
    PokemonAPI.getNonExistentAbility().then((response) => {
      PokemonAPI.verifyNotFoundResponse(response);
    });
  });

  it('GET - Should retrieve Pokemon information by ID', () => {
    PokemonAPI.getPokemonById(25).then((response) => {
      PokemonAPI.verifyPokemonResponse(response, 'pikachu');
    });
  });

  it('GET - Should retrieve abilities with pagination', () => {
    PokemonAPI.getAbilitiesWithPagination().then((response) => {
      PokemonAPI.verifyPaginationResponse(response, 5);
    });
  });

  it('GET - Should retrieve detailed type information by ID with all required properties', () => {
    PokemonAPI.getTypeById(13).then((response) => {
      PokemonAPI.verifyTypeResponse(response, 'electric');
    });
  });

  it('GET - Should handle invalid endpoint request', () => {
    PokemonAPI.getInvalidEndpoint().then((response) => {
      PokemonAPI.verifyBadRequestResponse(response);
    });
  });
});
