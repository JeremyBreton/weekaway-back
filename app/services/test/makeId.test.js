import makeIdFunction from '../randomId.service.js';

describe('makeId', () => {
  it('should generate a random ID of the specified length', () => {
    const length = 10;
    const id = makeIdFunction.makeId(length);

    // Vérifie que la longueur de l'ID généré correspond à la longueur spécifiée
    expect(id).toHaveLength(length);

    // Vérifie que l'ID est composé uniquement de caractères alphanumériques
    expect(/^[a-zA-Z0-9]+$/.test(id)).toBe(true);
  });
});
