const getFullList = () => require("../assets/json/fullPokemonList.json");

const getPokemonById = (id) =>
  require("../assets/json/fullPokemonList.json").find(
    (pokemon) => pokemon.id == id
  );

const getPokemonByName = (name) =>
  require("../assets/json/fullPokemonList.json").find(
    (pokemon) => pokemon.name === name
  );

module.exports = {
  getFullList,
  getPokemonById,
  getPokemonByName,
};
