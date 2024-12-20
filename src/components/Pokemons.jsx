import axios from "axios"
import { FaSearch } from "react-icons/fa"
import { useEffect, useState } from "react"
import { PokemonList } from "./PokemonList"
export const Pokemons = () => {

    const [allPokemons, setAllPokemons] = useState([])

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=889")
            .then(({ data }) => setAllPokemons(data.results))
            .catch((err) => console.log(err))
    }, []);

    return (
        <section className="p-4 py-5 ">
            <form action="">
                <div className="bg-white p-4 flex rounded-2xl text-lg ">
                    <input
                        className="outline-none flex-1"
                        type="text"
                        placeholder="Search for a Pokemon"
                    />
                    <button className="bg-red-500 p-2 rounded-xl shadow-lg shadow-red-500 hover:bg-red-400 transition-colors">
                        <FaSearch className="fill-white" />
                    </button>
                </div>
            </form>
            <PokemonList pokemons={allPokemons} />

        </section>
    )
}