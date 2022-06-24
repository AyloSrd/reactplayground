import useVFS, { ENTRY_POINT_JSX, VFS } from '@/hooks/playground/useVFS'
import { BundleError, createErrorString } from '@/tools/esbuild-tools'
import { countGen } from '@/tools/editor.tools'
import { initialLoader } from '@/tools/iframe-tools'
import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localforage from 'localforage'
import { useCallback, useEffect, useRef, useState } from 'react'

interface OutputTypeSuccess {
    code: string,
    error: null,
}

interface OutputTypeFail {
    code: null,
    error: string,
}

export type OutputType = OutputTypeSuccess | OutputTypeFail

const fileCache = localforage.createInstance({
    name: 'filecache',
})

export default function useEsbuild(vfsFromUrl: VFS | null) {
    const [bundleJSXText, setBundleJSXText] = useState<null | string>(initialLoader)
    const [bundleErr, setBundleErr] = useState<null | string>(null)
    const [rawImports, setRawImports] = useState<Array<string>>([])

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
        resetVFS,
    } = useVFS(vfsFromUrl)

    const esbuildRef = useRef<any>(esbuild)
    const isEsbuildInitializedRef = useRef<boolean>(false)
    const versionGeneratorRef = useRef<Generator<number>>(countGen())
    const versionRef = useRef<number>(versionGeneratorRef.current.next().value)

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

                    if (args.path.startsWith('./') && vfs[`${args.path.substring(2)}.js`]) {
                        return {
                            namespace: 'a',
                            path: `${args.path.substring(2)}.js`
                        }
                    }

                    if (args.path.includes('./') || args.path.includes('../')) {
                        return {
                        namespace: 'b',
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
                        namespace: 'b',
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

    const createBundle = useCallback(async (vfs: VFS, prevVersion: number)=> {
        if (
            ! isEsbuildInitializedRef.current
            || typeof versionRef.current !== 'number'
        ) {
            return
        }
        resetImports()
        try {
            const bundle = await esbuildRef.current.build({
                entryPoints: [ENTRY_POINT_JSX],
                bundle: true,
                metafile: true,
                write: false,
                plugins: [unpkgPathPlugin(vfs)],
                // @ts-ignore, this is necessary because vite will automatically escape and replace the string "process.env.NODE_ENV"
                define: window.defineHack,
            })
            const bundleJSX = bundle?.outputFiles?.[0]?.text
            const _imports = bundle?.metafile?.inputs
            if (prevVersion < versionRef.current) {
                return
            }
            console.log(_imports)
            setBundleJSXText(bundleJSX)
            setBundleErr(null)
            setRawImports(_imports)
        } catch(err) {
            if (prevVersion < versionRef.current) {
                return
            }

            setBundleJSXText(null)
            setBundleErr(createErrorString(err as BundleError))
        }

    }, [])

    useEffect(() => {
        esbuildRef.current.initialize({
            wasmURL:  '/esbuild.wasm' // 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm' //
        }).then(() => {
            isEsbuildInitializedRef.current = true
            createBundle(vfs, versionRef.current)
        })
    }, [])

    return {
        addFile,
        createBundle,
        deleteFile,
        editFileContent,
        editFileName,
        files: {
            fileList,
            filesById: vfs
        },
        output: {
            code: typeof bundleJSXText === 'string' ? bundleJSXText : null,
            error: typeof bundleJSXText === 'string' ? null : bundleErr,
        } as OutputType,
        resetVFS,
        versionGeneratorRef,
        versionRef,
    }
}
