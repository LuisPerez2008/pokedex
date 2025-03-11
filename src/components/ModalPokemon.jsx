import { FaTimes } from 'react-icons/fa'
import { colorByType } from '../constants/poke'
import { Evolutions } from './Evolutions'
import { PokemonDetail } from './PokemonDetail'


export const ModalPokemon = ({ showModal, onCloseModal, pokemon }) => {



  return (
    <section className={`fixed lg:hidden top-0 right-0 left-0 h-screen transition-all duration-300 ${showModal ? 'visible opacity-100' : 'invisible opacity-0 '} ${colorByType[pokemon?.types[0]]}`}>
      <button onClick={onCloseModal} className='bg-white p-2 rounded-lg shadow-lg absolute top-4 right-4 hover:opacity-80 transition-opacity'>
        <FaTimes className="" />
      </button>

      <article className={`bg-white h-[85%]  absolute w-full  rounded-tl-3xl rounded-tr-3xl text-center transition-all  duration-500 ${showModal ? 'bottom-0' : '-bottom-full'}  `}>
        <PokemonDetail pokemon={pokemon} />
      </article>
    </section>
  )
}