import axios from "axios"
import { FaSearch } from "react-icons/fa"
import { useEffect, useRef, useState } from "react"
import { PokemonList } from "./PokemonList"
import { useIntersectionObserver } from "../hooks/useIntersectionObserver"


const INITIAL_LIMIT = 40;

export const Pokemons = () => {

    const [allPokemons, setAllPokemons] = useState([])
    const [namePokemon, setNamePokemon] = useState("");
    const [limit, setLimit] = useState(INITIAL_LIMIT);
    const [cargando, setCargando] = useState(false)

    const targetObserver = useRef(null);
    const entry = useIntersectionObserver(targetObserver, {})
    const isVisible = !!entry?.isIntersecting


    const handleSearch = (e) => setNamePokemon(e.target.value.toLowerCase());

    const pokemonByName = allPokemons.filter(pokemon => pokemon.name.includes(namePokemon))



    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=898")
            .then(({ data }) => setAllPokemons(data.results))
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
        const maxPokemons = pokemonByName.length;
        if (isVisible && maxPokemons !== 0) {
            setCargando(true)
            setTimeout(() => {
                const newLimit = limit + 20;

                newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit);
                setCargando(false)
            }, 1000)

        }
    }, [isVisible])

    useEffect(() => {
        setLimit(INITIAL_LIMIT)
    }, [namePokemon])

    const imageCarg = (
        <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    )

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
                    <button type="button" className="bg-red-500 p-2 rounded-xl shadow-lg shadow-red-500 hover:bg-red-400 transition-colors">
                        <FaSearch className="fill-white" />
                    </button>
                </div>
            </form>
            <PokemonList pokemons={pokemonByName.slice(0, limit)} />
            <span ref={targetObserver}></span>
            <div className="gird place-items-center py-4">{cargando ? imageCarg : null}</div>
        </section>
    )
}