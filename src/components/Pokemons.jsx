import axios from "axios"
import { FaSearch } from "react-icons/fa"
import { useEffect, useRef, useState } from "react"
import { PokemonList } from "./PokemonList"
import { useIntersectionObserver } from "../hooks/useIntersectionObserver"
import { use } from "react"

const INITIAL_LIMIT = 40;

export const Pokemons = () => {

    const [allPokemons, setAllPokemons] = useState([])
    const [namePokemon, setNamePokemon] = useState("");
    const [limit, setLimit] = useState(INITIAL_LIMIT);

    const targetObserver = useRef(null);
    const entry = useIntersectionObserver(targetObserver, {})
    const isVisible = !!entry?.isIntersecting

    console.log(isVisible);

    const handleSearch = (e) => setNamePokemon(e.target.value.toLowerCase());

    const pokemonByName = allPokemons.filter(pokemon => pokemon.name.includes(namePokemon))



    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=898")
            .then(({ data }) => setAllPokemons(data.results))
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        if (isVisible) {
            const maxPokemons = pokemonByName.length;
            const newLimit = limit + 20;

            newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit);
        }
    }, [isVisible])

    useEffect(() => {
        setLimit(INITIAL_LIMIT)
    }, [namePokemon])

    return (
        <section className="p-4 py-5 ">
            <form action="">
                <div className="bg-white p-4 flex rounded-2xl text-lg ">
                    <input
                        className="outline-none flex-1"
                        type="text"
                        placeholder="Search for a Pokemon"
                        onChange={handleSearch}
                    />
                    <button className="bg-red-500 p-2 rounded-xl shadow-lg shadow-red-500 hover:bg-red-400 transition-colors">
                        <FaSearch className="fill-white" />
                    </button>
                </div>
            </form>
            <PokemonList pokemons={pokemonByName.slice(0, limit)} />
            <span ref={targetObserver}></span>
        </section>
    )
}