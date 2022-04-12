import { useState } from 'react'
import Playground from '@/components/playground/Playground'

import '@/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
        <Playground />
    </div>
  )
}

export default App
