import useVFS, { ENTRY_POINT_JSX, VFS } from '@/hooks/playground/useVFS'
import { BundleError, createErrorString } from '@/tools/esbuild-tools'
import { countGen } from '@/tools/editor.tools'
import { initialLoader } from '@/tools/iframe-tools'
import { RawImports } from '@/tools/exports-tools'
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

export const CDN = 'https://esm.sh'

export const make_CDN_URL = (pkg: string) => `${CDN}/${pkg}?pin=v92`

const fileCache = localforage.createInstance({
    name: 'filecache',
})

const make_css_contents = (originalCSS: string) => {
    const escapedCSS = originalCSS
    .replace(/\n/g, '')
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")

    const CSSContents = `
const styleTag = document.createElement('style')
styleTag.innerText = '${escapedCSS}'
document.head.appendChild(styleTag)
    `.trim()

    return CSSContents
}

export default function useEsbuild(vfsFromUrl: VFS | null) {
    const [bundleJSXText, setBundleJSXText] = useState<null | string>(initialLoader)
    const [bundleErr, setBundleErr] = useState<null | string>(null)
    const [rawImports, setRawImports] = useState<RawImports>({})

    const {
        addFile,
        deleteFile,
        editFileContent,
        editFileName,
        fileList,
        vfs,
        resetVFS,
    } = useVFS(vfsFromUrl)

    const esbuildRef = useRef<any>(esbuild)
    const isEsbuildInitializedRef = useRef<boolean>(false)
    const versionGeneratorRef = useRef<Generator<number>>(countGen())
    const versionRef = useRef<number>(versionGeneratorRef.current.next().value)

    const vfs_with_esm_sh_plugin = useCallback((vfs: VFS) => {
        return {
            name: 'vfs-with-esm-sh-plugin',
            setup(build: esbuild.PluginBuild) {
                build.onResolve({ filter: /.*/ }, async (args: any) => {

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

                    if (args.path.startsWith('./') && vfs[`${args.path.substring(2)}.jsx`]) {
                        return {
                            namespace: 'a',
                            path: `${args.path.substring(2)}.jsx`
                        }
                    }

                    if (args.path.startsWith(CDN)) {
                        return {
                        namespace: 'b',
                        path: args.path,
                        }
                    }

                    if (args.path.includes('./') || args.path.includes('../')) {
                        return {
                        namespace: 'b',
                        path: new URL(
                            args.path,
                            CDN + args.resolveDir + '/'
                        ).href,
                        }
                    }

                    if (args.path.startsWith('/')) {
                        return {
                            namespace: 'b',
                            //@ts-ignore: defineHack is defined in index.html
                            path: `${CDN}${args.path}`,
                        }
                    }

                    return {
                        namespace: 'b',
                        //@ts-ignore: defineHack is defined in index.html
                        path: make_CDN_URL(args.path),
                    }
                })

                build.onLoad({ filter: /.css$/ }, async (args: any) => {
                    const contents = make_css_contents(vfs[args.path] ? vfs[args.path] : '')

                    const result: esbuild.OnLoadResult = {
                        loader: 'jsx',
                        contents,
                    }

                    return result
                })

                build.onLoad({ filter: /.*/ }, async (args: any) => {
                    if (args.path === ENTRY_POINT_JSX) {
                        return ({
                            loader: 'jsx',
                            contents: vfs[ENTRY_POINT_JSX],
                        })
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
        try {
            const bundle = await esbuildRef.current.build({
                bundle: true,
                entryPoints: [ENTRY_POINT_JSX],
                format: 'esm',
                metafile: true,
                write: false,
                plugins: [vfs_with_esm_sh_plugin(vfs)],
                // @ts-ignore, this is necessary because vite will automatically escape and replace the string "process.env.NODE_ENV"
                define: window.defineHack,
            })
            const bundleJSX = bundle?.outputFiles?.[0]?.text
            const _imports = bundle?.metafile?.inputs
            if (prevVersion < versionRef.current) {
                return
            }
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
        try {
            esbuildRef.current.initialize({
                wasmURL:  '/esbuild.wasm' // 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm' //
            }).then(() => {
                isEsbuildInitializedRef.current = true
                createBundle(vfs, versionRef.current)
            })
        } catch {
            createBundle(vfs, versionRef.current)
        }

        function clearDB() {
            localforage.clear()
        }

        return () => clearDB()
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
        rawImports,
        resetVFS,
        versionGeneratorRef,
        versionRef,
    }
}
