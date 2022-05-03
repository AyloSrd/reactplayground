import useVFS, { ENTRY_POINT_JSX, VFS } from '@/hooks/playground/useVFS'
import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localforage from 'localforage'
import { useCallback, useEffect, useRef, useState } from 'react'

const fileCache = localforage.createInstance({
    name: 'filecache',
})

export default function useEsbuild(vfsFromUrl: VFS | null) {
    const [bundleJSXText, setBundleJSXText] = useState<string>('')
    const [hasLoaded, setHasLoaded] = useState<boolean>(false)

    const {
        addDirectImport,
        addFile,
        addVersionedImport,
        deleteFile,
        editFileContent,
        editFileName,
        fileList,
        vfs,
        resetImports,
    } = useVFS(vfsFromUrl)

    const esbuildRef = useRef<any>()

    const startService = useCallback(async () => {
        esbuildRef.current = await esbuild.startService({
            worker: true,
            wasmURL:  '/esbuild.wasm' // https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })
    }, [])

    const unpkgPathPlugin = useCallback((vfs: VFS) => {
        return {
            name: 'unpkg-path-plugin',
            setup(build: esbuild.PluginBuild) {
                build.onResolve({ filter: /.*/ }, async (args: any) => {
                    addVersionedImport(args.resolveDir.substring(1))

                    if (args.path === ENTRY_POINT_JSX) {
                        return { path: args.path, namespace: 'a' }
                    }

                    if (args.path.startsWith('./') && vfs[args.path.substring(2)]) {
                        return {
                            namespace: 'a',
                            path: args.path.substring(2)
                        }
                    }

                    if (args.path.includes('./') || args.path.includes('../')) {
                        return {
                        namespace: 'a',
                        path: new URL(
                            args.path,
                            'https://unpkg.com' + args.resolveDir + '/'
                        ).href,
                        }
                    }

                    if (typeof vfs[args.importer] === 'string') {
                        addDirectImport(args.path.split('/')[0])
                    }

                    return {
                        namespace: 'a',
                        path: `https://unpkg.com/${args.path}`,
                    }
                })

                build.onLoad({ filter: /.*/ }, async (args: any) => {
                    if (args.path === ENTRY_POINT_JSX) {
                        return {
                        loader: 'jsx',
                        contents: vfs[ENTRY_POINT_JSX],
                        }
                    }

                    if (vfs[args.path]) {
                        return {
                            loader: 'jsx',
                            contents: vfs[args.path],
                        }
                    }

                    const cached = await fileCache.getItem<esbuild.OnLoadResult>(args.path)

                    if (cached) {
                        return cached
                    }

                    const { data, request } = await axios.get(args.path)

                    const result: esbuild.OnLoadResult = {
                        loader: 'jsx',
                        contents: data,
                        resolveDir: new URL('./', request.responseURL).pathname,
                    }

                    await fileCache.setItem(args.path, result)

                    return result
                })
            },
        }
    }, [])

    const createBundle = useCallback(async (vfs: VFS)=> {
        if (!esbuildRef.current) {
            return
        }
        resetImports()
        const bundle = await esbuildRef.current.build({
            entryPoints: [ENTRY_POINT_JSX],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(vfs)],
            // @ts-ignore, this is necessary because vite will automatically escape and replace the string "process.env.NODE_ENV"
            define: window.defineHack,
          })
        const bundleJSX = bundle?.outputFiles?.[0]?.text

        setBundleJSXText(bundleJSX)
    }, [esbuildRef])

    useEffect(() => {
        startService()
            .then(() => createBundle(vfs))
    }, [])

    return {
        addFile,
        bundleJSXText,
        createBundle,
        deleteFile,
        editFileContent,
        editFileName,
        files: {
            fileList,
            filesById: vfs
        },
        hasLoaded,
    }
}

/**http://localhost:3000/#N4IgggDhB0BWDOAPEAuEBLAthA9gJwBcACAIQFcCCcA7IgMzx0yIHJoB6cymuJFgHWpZchIgCUApgEMAxgQA0RYETLwJAZQJSCEogF96jZizzS5AodnzFlM09olicOYgYZNW9uQFoAJk3YZABt0CWoCC0EZGnhiSAgiAF4iAAoASiSAPiVBIjyiaOpYogBtaLJwxTUCAGEcCoIAXSSVNU0HFIBGAAY0wVz80wIyPFoU-oJ+AgAeTImpqemuKlp2OeoFyZmAIwoVohoakJkAa0TgdKyiarqGlPLwogBqIk60vXXNzeAHgj0B-L5RbsXbcaifLbTNYAoh9aj-DbUQrFQpadDUCR4Fr+GRkTBhAjQADmEgIAFEghJ8eESABPACSvhSJmcETSAG4ojFiIwXC07NIdE4XPcaGiMXg4bzCaZqL5MSlpvEiGsOSB5CBljwEMg0MJrOIzMR3MYvBF+hjECJiPK6FIyEFjRU5OgaKQ9jRLsAJkMRrRpqCVpkAJo4KGBmjrPQgPRAA */