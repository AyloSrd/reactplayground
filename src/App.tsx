import Playground from '@/components/playground/Playground'
import { VFS } from '@/hooks/playground/useEsbuild'
import { compressToEncodedURIComponent as compress} from 'lz-string'
import { useCallback, useEffect } from 'react'

function App() {

    const updateURL = useCallback((e: CustomEvent<VFS>) => {
        const { detail: vfs } = e
        const url = new URL(location.href)
        url.hash = compress(JSON.stringify(vfs))
        history.replaceState({}, '', url.toString())
    },[])

    useEffect(() => {
        console.log('mounted')
    }, [])

  return (
    <div>
        <Playground
            onUpdateVFS={updateURL}
        />
    </div>
  )
}

export default App
