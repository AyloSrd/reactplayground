import useVFS, { ENTRY_POINT_JSX, VFS } from '@/hooks/playground/useVFS'
import { BundleError, createErrorString } from '@/tools/esbuild-tools'
import { countGen } from '@/tools/editor.tools'
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
    const [bundleJSXText, setBundleJSXText] = useState<null | string>('')
    const [bundleErr, setBundleErr] = useState<null | string>(null)

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
    const versionGeneratorRef = useRef<Generator<number>>(countGen())
    const versionRef = useRef<number>(versionGeneratorRef.current.next().value)

    const startService = useCallback(async () => {
        esbuildRef.current = await esbuild.startService({
            worker: true,
            wasmURL:  '/esbuild.wasm' // 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm' // 
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

    const createBundle = useCallback(async (vfs: VFS, prevVersion: number)=> {
        if (
            !esbuildRef.current 
            || typeof versionRef.current !== 'number'
        ) {
            return
        }
        resetImports()
        try {
            const bundle = await esbuildRef.current.build({
                entryPoints: [ENTRY_POINT_JSX],
                bundle: true,
                write: false,
                plugins: [unpkgPathPlugin(vfs)],
                // @ts-ignore, this is necessary because vite will automatically escape and replace the string "process.env.NODE_ENV"
                define: window.defineHack,
              })
            const bundleJSX = bundle?.outputFiles?.[0]?.text

            if (prevVersion < versionRef.current) {
                return
            }

            setBundleJSXText(bundleJSX)
            setBundleErr(null)
        } catch(err) {
            if (prevVersion < versionRef.current) {
                return
            }

            setBundleJSXText(null)
            setBundleErr(createErrorString(err as BundleError))
        }

    }, [])

    useEffect(() => {
        startService()
            .then(() => createBundle(vfs, versionRef.current))
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
        versionGeneratorRef,
        versionRef,
    }
}

/**http://localhost:3000/#N4IgggDhB0BWDOAPEAuEBLAthA9gJwBcACAIQFcCCcA7IgMzx0yIHJoB6cymuJFgHWpZchIgCUApgEMAxgQA0RYETLwJAZQJSCEogF96jZizzS5AodnzFlM09olicOYgYZNW9uQFoAJk3YZABt0CWoCC0EZGnhiSAgiAF4iAAoASiSAPiVBIjyiaOpYogBtaLJwxTUCAGEcCoIAXSSVNU0HFIBGAAY0wVz80wIyPFoU-oJ+AgAeTImpqemuKlp2OeoFyZmAIwoVohoakJkAa0TgdKyiarqGlPLwogBqIk60vXXNzeAHgj0B-L5RbsXbcaifLbTNYAoh9aj-DbUQrFQpadDUCR4Fr+GRkTBhAjQADmEgIAFEghJ8eESABPACSvhSJmcETSAG4ojFiIwXC07NIdE4XPcaGiMXg4bzCaZqL5MSlpvEiGsOSB5CBljwEMg0MJrOIzMR3MYvBF+hjECJiPK6FIyEFjRU5OgaKQ9jRLsAJkMRrRpqCVpkAJo4KGBmjrPQgPRAA */

/**
 *
 * error: Error: Build failed with 1 error: a:App.js:1:32: error: [unpkg-path-plugin] Request failed with status code 404 at he (http://localhost:3000/node_modules/.vite/deps/esbuild-wasm.js?v=9fa389e2:534:26) at j (http://localhost:3000/node_modules/.vite/deps/esbuild-wasm.js?v=9fa389e2:408:26) at http://localhost:3000/node_modules/.vite/deps/esbuild-wasm.js?v=9fa389e2:443:38 at K (http://localhost:3000/node_modules/.vite/deps/esbuild-wasm.js?v=9fa389e2:319:68) at v (http://localhost:3000/node_modules/.vite/deps/esbuild-wasm.js?v=9fa389e2:257:21) at Worker.i.onmessage (http://localhost:3000/node_modules/.vite/deps/esbuild-wasm.js?v=9fa389e2:609:58)
errors: Array(1)
0:
location:
column: 32
file: "a:App.js"
length: 5
line: 1
lineText: "import React, { useState } from 'rct'"
[[Prototype]]: Object
text: "[unpkg-path-plugin] Request failed with status code 404"
[[Prototype]]: Object
length: 1
[[Prototype]]: Array(0)
warnings: []
message: "Build failed with 1 error:\na:App.js:1:32: error: [unpkg-path-plugin] Request failed with status code 404"
stack: "Error: Build failed with 1 error:\na:App.js:1:32: error: [unpkg-path-plugin] Req
 */