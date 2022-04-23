import Playground from '@/components/playground/Playground'
import { ENTRY_POINT_JSX, VFS } from '@/hooks/playground/useEsbuild'
import { compressToEncodedURIComponent as compress, decompressFromEncodedURIComponent as decompress } from 'lz-string'
import { useCallback, useEffect, useState } from 'react'

function App() {
    const [initialVFS, setInitialVFS] = useState<VFS | undefined | null>(undefined)

    const updateURL = useCallback((e: CustomEvent<VFS>) => {
        const { detail: vfs } = e
        const url = new URL(location.href)
        url.hash = compress(JSON.stringify(vfs))
        history.replaceState({}, '', url.toString())
    },[])

    useEffect(() => {
        const url = new URL(location.href)
        const { hash } = url
        const vfsString = decompress(hash.slice(1))
        const vfs = typeof vfsString == 'string' ? JSON.parse(vfsString) : {}

        setInitialVFS(vfs[ENTRY_POINT_JSX] ? vfs : null)
    }, [])

  return (
    <div>
        {
            initialVFS === undefined ?
                <p>Loading...</p>
            :
                <Playground
                    initialVFS={initialVFS}
                    onUpdateVFS={updateURL}
                />

        }
    </div>
  )
}

export default App
