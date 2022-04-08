import { useState } from 'react'
import Playground from '@/components/playground/Playground'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <header>
        <Playground />
      </header>
    </div>
  )
}

export default App
