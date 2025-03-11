import { PokemonDetail } from "./PokemonDetail"

export const Aside = ({ pokemon, isLoading }) => {



  return (
    <section className="hidden lg:block sticky top-0 h-screen overflow-hidden ">
      <article className={`absolute bg-white w-full h-[90%] z-20 bottom-0 rounded-tl-3xl rounded-tr-3xl text-center transition-all duration-500 ${pokemon && !isLoading ? "left-0" : "left-[50vw]"}`}>
        <PokemonDetail pokemon={pokemon} />
      </article>

      <article className={`absolute bg-white w-full h-[85%] z-20 bottom-0 rounded-tl-3xl rounded-tr-3xl grid place-content-center text-center transition-all duration-500 ${pokemon ? "left-[50vw]" : "left-0"}`}>
        <header>
          <img src="imgs/pika-sombra.png" alt="" className="contrast-0 w-36 flex left-1/2 -translate-x-[50%] -top-20 absolute " />
        </header>

        <span className="px-8 text-lg ">Select a Pokemon a display here </span>
      </article>


      <div className={`grid place-content-center h-screen ${!isLoading ? "hidden" : "block"} `}>
        <img src="/imgs/pokeball-icon.png" alt="" className={` animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500 `} />
      </div>
    </section>


  )
}