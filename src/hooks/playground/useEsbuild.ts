import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localforage from 'localforage'
import { useCallback, useEffect, useReducer, useRef, useState } from 'react'


enum ActionKind {
    ADD_FILE = 'ADD_FILE',
    DELETE_FILE = 'DELETE_FILE',
    EDIT_FILE_CONTENT = ' EDIT_FILE_CONTENT',
    EDIT_FILE_NAME = 'EDIT_FILE_NAME',
}

interface Action {
    type: ActionKind,
    payload: {
        target: string,
        content: string
    },
}

export interface VFS {
    [key: string]: string
}

interface State {
    fileList: string[],
    vfs: VFS
}

export const ENTRY_POINT_JSX = 'App.jsx'

const AppdefaultContent = `
import React, { useState } from 'react'
import styled from 'styled-components'
console.log(React)
`.trim()

const initialState: State = {
    fileList: [ENTRY_POINT_JSX],
    vfs : {
        [ENTRY_POINT_JSX]: AppdefaultContent
    }
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionKind.ADD_FILE :
            if (
                action.payload.target === ENTRY_POINT_JSX
                || state.fileList.includes(action.payload.target)
            ) {
                return state
            }
            return {
                fileList: [ ...state.fileList, action.payload.target ],
                vfs: {
                    ...state.vfs,
                    [action.payload.target]: action.payload.content
                }
            }

        case ActionKind.DELETE_FILE :
            if (action.payload.target === ENTRY_POINT_JSX) {
                return state
            }
            const deleteList = [...state.fileList].filter(f => f !== action.payload.target)
            const deleteVfs = { ...state.vfs }
            delete deleteVfs[action.payload.target]
            return {
                fileList: deleteList,
                vfs: deleteVfs
            }

        case ActionKind.EDIT_FILE_CONTENT :
            if (state.vfs[action.payload.target] === undefined) {
                return state
            }
            const editContentVfs = { ...state.vfs }
            editContentVfs[action.payload.target] = action.payload.content
            console.log(editContentVfs)
            return {
                fileList: [...state.fileList],
                vfs: editContentVfs
            }

        case ActionKind.EDIT_FILE_NAME :
            if (
                action.payload.target === ENTRY_POINT_JSX
                || !state.fileList.includes(action.payload.target)
                || typeof state.vfs[action.payload.target] !== 'string'
            ) {
                return state
            }

            const indexOfEditedFile = state.fileList.indexOf(action.payload.target)
            const editedNameFileList = [...state.fileList]
            const editedFileContent = state.vfs[action.payload.target]
            const editedNameVfs = { ...state.vfs }
            editedNameFileList[indexOfEditedFile] = action.payload.content
            delete editedNameVfs[action.payload.target]
            editedNameVfs[action.payload.content] = editedFileContent
            return {
                fileList: editedNameFileList,
                vfs: editedNameVfs
            }

        default:
            throw new Error()
    }
}

const fileCache = localforage.createInstance({
    name: 'filecache',
  })

export default function useEsbuild() {
    const [{ vfs, fileList }, dispatch] = useReducer(reducer, initialState)

    const [bundleJSXText, setBundleJSXText] = useState<string>('')

    const esbuildRef = useRef<any>()

    const addFile = useCallback((payload: Action['payload']) => {
        dispatch({
            type: ActionKind.ADD_FILE,
            payload
        })
    }, [])

    const deleteFile = useCallback((payload: Action['payload']) => {
        dispatch({
            type: ActionKind.DELETE_FILE,
            payload
        })
    }, [])

    const editFileContent = useCallback((payload: Action['payload']) => {
        dispatch({
            type: ActionKind.EDIT_FILE_CONTENT,
            payload
        })
    }, [])

    const editFileName = useCallback((payload: Action['payload']) => {
        dispatch({
            type: ActionKind.EDIT_FILE_NAME,
            payload
        })
    }, [])

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
                console.log('onResolve', args)
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

                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`,
                }
                })

            build.onLoad({ filter: /.*/ }, async (args: any) => {
              console.log('onLoad', args)

                if (args.path === ENTRY_POINT_JSX) {
                    console.log('onLoad', vfs[ENTRY_POINT_JSX])
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

        const bundle = await esbuildRef.current.build({
            entryPoints: ['App.jsx'],
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
    }
}