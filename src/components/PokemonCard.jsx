import axios from "axios"
import { useEffect, useState } from "react"
import { colorByType } from "../constants/poke"
export const PokemonCard = ({ pokemonURL, onclick }) => {

  const [pokemon, setPokemon] = useState(null)



  useEffect(() => {
    axios.get(pokemonURL)
      .then(({ data }) => setPokemon(data))
      .catch(err => console.log(err))
  }, []);



  return (
    <article onClick={() => onclick(pokemon)} className="text-center font-semibold bg-white rounded-[30px] relative capitalize pb-4 shadow-lg shadow-slate-400/10 group  border-2 border-transparent hover:border-slate-200 cursor-pointer grid gap-2">
      <header className="h-9">
        <img
          className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 group-hover:scale-110 transition-alls duration-300 pixelado"
          src={pokemon?.sprites.versions["generation-v"]["black-white"].front_default} alt={pokemon?.name}
        />
      </header>
      <span className="text-sm text-slate-400">N° {pokemon?.id}</span>
      <h4 className="text-lg">{pokemon?.name}</h4>
      <ul className="flex justify-center gap-2">
        {
          pokemon?.types.map(type => {

            return (
              <li
                className={`${colorByType[type.type.name]} p-1 text-white rounded-md text-sm px-2`}
                key={type.type.name}
              >
                {type.type.name}
              </li>)


          }
          )
        }
      </ul>
    </article>
  )
}