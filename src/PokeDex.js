/** @format */

import React from "react";
import { v1 as uuid } from "uuid";
import useAxios, { formatPokemonData } from "./hooks";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";

function PokeDex() {
  const [pokemon, fetchPokemonData, clearPokemon] = useAxios(
    "https://pokeapi.co/api/v2/pokemon/",
    formatPokemonData
  );

  const addPokemon = async (name) => {
    await fetchPokemonData(name);
  };

  const handleClearPokemon = () => {
    clearPokemon();
  };

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} />
        <button onClick={handleClearPokemon}>Clear all pokemon cards</button>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map((pokemonData) => (
          <PokemonCard
            key={pokemonData.id}
            front={pokemonData.front}
            back={pokemonData.back}
            name={pokemonData.name}
            stats={pokemonData.stats}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
