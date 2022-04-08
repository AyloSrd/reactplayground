import { useState } from 'react'
import CodeMirror from '@/components/editor/CodeMirror'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <header>
        <CodeMirror />
      </header>
    </div>
  )
}

export default App
