import { useState } from 'react'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="position-center h-screen">
      <h1 className='text-5xl font-bold'>Pokedex</h1>
      <p className='text-2xl'>{count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>

    </div>
  )
}

export default App
