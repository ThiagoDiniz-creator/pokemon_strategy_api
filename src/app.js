const express = require("express");

const { getPokemonById } = require("../utils/pokemonList.js");
const type = require("../utils/individual/type");
const app = express();

app.get("/pokemon", (req, res) => {
  if (
    req.query.id === undefined ||
    req.query.id === "" ||
    isNaN(req.query.id)
  ) {
    res.send({
      error: "Please provide a valid id",
    });
  } else {
    const { id } = req.query;
    const pokemon = getPokemonById(id);
    const { types, name, stats } = pokemon;
    const typeRating = type.getTypeRating(
      types.length > 1
        ? {
            type1: types[0].type.name,
            type2: types[1].type.name,
            quantity: 2,
          }
        : {
            type1: types[0].type.name,
            quantity: 1,
          }
    );
    res.send({
      id,
      name: pokemon.name,
      typeRating,
    });
  }
});

app.listen(3002, () => console.log("Server is working!"));
