import { FaTimes } from 'react-icons/fa'
export const ModalPokemon = ({ showModal, onCloseModal }) => {

  console.log(onCloseModal)

  return (
    <section className={`fixed top-0 right-0 left-0 bg-green-300 h-screen transition-all duration-300 ${showModal ? 'visible opacity-100' : 'invisible opacity-0 '}`}>
      <button onClick={onCloseModal} className='bg-white p-2 rounded-lg shadow-lg absolute top-4 right-4 hover:opacity-80 transition-opacity'>
        <FaTimes className="" />
      </button>
      <article className={`bg-white h-[85%] absolute w-full  rounded-tl-3xl rounded-tr-3xl p-4 text-center transition-all duration-500 ${showModal ? 'bottom-0' : '-bottom-full'}`}>
        pokemon
      </article>
    </section>
  )
}