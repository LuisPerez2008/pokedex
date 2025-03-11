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
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=850")
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
        <img src="/imgs/pokeball-icon.png" alt="" className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 " />
    )

    return (
        <section className="p-4 py-5 ">
            <form action="" className="lg:sticky lg:top-0 lg:z-20 bg-slate-50 lg:p-1">
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