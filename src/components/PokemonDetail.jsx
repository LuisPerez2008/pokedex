import { colorByType } from "../constants/poke"
import { Evolutions } from "./Evolutions"
import { colorByStat } from "../constants/poke"

export const PokemonDetail = ({ pokemon }) => {


  return (
    <>
      <header className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ' >
        <img src={pokemon?.image} alt={pokemon?.name} className='pixelado w-24 aspect-square' />
      </header>
      <div className='overflow-y-auto px-4 pt-8 grid gap-2 content-start h-full '>

        <span className='text-slate-300  mt-9'>N° {pokemon?.id}</span>
        <h2 className='font-bold text-xl capitalize'>{pokemon?.name}</h2>

        <ul className="flex justify-center gap-2">
          {
            pokemon?.types.map(type =>
              <li
                className={`p-1 rounded-md px-2 text-white text-sm ${colorByType[type]}`}
                key={type}
              >
                {type}
              </li>
            )
          }
        </ul>
        <div>
          <h4 className='font-bold capitalize'>Pokedex Entry</h4>
          <p className='text-slate-400 lg:text-sm'>{pokemon?.description}</p>
        </div>
        <section className='grid grid-cols-2 gap-4' >
          <div>
            <h4 className='font-bold capitalize'>Height</h4>
            <span className='bg-slate-100 block rounded-full p-1'>{pokemon?.height}</span>
          </div>
          <div>
            <h4 className='font-bold capitalize'>weight</h4>
            <span className='bg-slate-100 block rounded-full p-1 '>{pokemon?.weight}</span>
          </div>
        </section>

        <section>
          <h4 className='font-bold capitalize'>Abilities</h4>
          <div className='grid grid-cols-2 gap-4'>

            {
              pokemon?.abilities.map(abi => <div key={abi} className='bg-slate-100 block rounded-full p-1 capitalize'>{abi}</div>)
            }


          </div>
        </section>

        <section>
          <h4 className='font-bold capitalize'>Stast</h4>
          <ul className='flex justify-center gap-3 lg:gap-1 flex-wrap'>
            {
              pokemon?.stats.map((stat) => (
                <li key={stat.name} className={` p-1 rounded-full ${colorByStat[stat.name]}`}>
                  <div className='bg-green-500 text-white rounded-full w-[26px] aspect-square grid place-content-center'>
                    <span className='text-[10px] font-semibold'>{stat.name}</span>
                  </div>
                  <span className='font-semibold text-sm '>{stat.base_stat}</span>
                </li>
              ))
            }
          </ul>
        </section>

        <section className='grid gap-2'>
          <h4 className='font-bold capitalize'>Evolutions</h4>
          <Evolutions evolutions={pokemon?.evolutions ?? []} />
        </section>

      </div>
    </>
  )
}