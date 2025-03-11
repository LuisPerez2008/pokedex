import usePokemonContext from "../hooks/usePokemonContext"

export const Evolutions = ({ evolutions }) => {
  const { showPokemon } = usePokemonContext()
  return (
    <div className="flex justify-center gap-4 lg:gap-2 items-center flex-wrap">
      {evolutions.map((evolution, index) => (
        <article key={evolution.name} className="flex items-center gap-4">
          {index !== 0 && (
            <div className="bg-slate-100 p-2 lg:p-1 rounded-full text-sm font-bold">
              <span>Lv. {evolution.min_level}</span>
            </div>
          )}

          <button onClick={() => showPokemon(evolution.pokemonInfo)} className="hover:bg-slate-100 transition-colors rounded-xl">
            <img src={evolution.image} alt="" />
          </button>
        </article>
      ))}
    </div>
  )
}