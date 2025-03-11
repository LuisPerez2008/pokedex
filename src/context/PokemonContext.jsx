import { createContext } from "react";
import { useState } from "react";
import { formatAbilities, formatSpecies, formatStats, formatTypes, getEvolution, getImageByPokemon } from "../helpers/pokemonStats";
import axios from "axios";

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [showDetailPokemon, setShowDetailPokemon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showPokemon = async (pokemonInfo) => {
    setIsLoading(true)
    const { data: dataSpecies } = await axios.get(pokemonInfo.species.url)
    const { data: dataEvolutions } = await axios.get(dataSpecies.evolution_chain.url);

    const { id, name, height, weight, stats, types, abilities } = pokemonInfo;
    const evolutions = await getEvolution(dataEvolutions);

    console.log(evolutions)
    setPokemonDetail({
      id,
      name,
      height,
      weight,
      stats: formatStats(stats),
      types: formatTypes(types),
      abilities: formatAbilities(abilities),
      description: formatSpecies(dataSpecies),
      evolutions,
      image: getImageByPokemon(pokemonInfo.sprites)
    });


    setShowDetailPokemon(true);
    setTimeout(() => {
      setIsLoading(false)
    }, 500)

  }

  const closePokemonDetail = () => {
    setShowDetailPokemon(false);
  }

  return (
    <PokemonContext.Provider
      value={{
        showDetailPokemon,
        showPokemon,
        closePokemonDetail,
        pokemonDetail,
        isLoading
      }}

    >
      {children}
    </PokemonContext.Provider>
  )
}

export {
  PokemonContext,
  PokemonProvider,

}