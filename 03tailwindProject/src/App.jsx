import { useState } from 'react'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>
        Tailwind Props Test
      </h1>

      {/* Passing props explicitly */}
      <Card username="Muhammad Awais Altaf" btnText="Click Me" />

      {/* btnText not passed → default value "visit me" will be used */}
      <Card username="Awais" />

      {/* Another card with different image and text */}
      <Card username="New User" btnText="Explore More" />
    </>
  )
}

export default App
