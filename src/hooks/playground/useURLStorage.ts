import { compressToEncodedURIComponent as compress, decompressFromEncodedURIComponent as decompress } from 'lz-string'
import { ENTRY_POINT_JSX, VFS } from '@/hooks/playground/useVFS'
import { useCallback, useEffect, useState } from 'react'


export default function useURLStorage() {
    const [initialVFS, setInitialVFS] = useState<VFS | undefined | null>(undefined)

    const updateURL = useCallback((vfs: VFS) => {
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

    return {
        initialVFS,
        updateURL,
    }
}