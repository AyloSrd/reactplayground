import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import { useCallback, useEffect, useReducer, useRef, useState } from 'react'

interface VFS {
    [key: string]: string
}

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

export const ENTRY_POINT_JSX = 'App.jsx'

const AppdefaultContent = `
import React, { useState } from 'react'
import { test } from './Counter.jsx'
console.log(test)
`.trim()

const initialState: VFS = {
    [ENTRY_POINT_JSX]: AppdefaultContent
}

function reducer(state: VFS, action: Action) {
    switch (action.type) {
        case ActionKind.ADD_FILE :
            return {
                ...state,
                [action.payload.target]: action.payload.content
            }

        case ActionKind.DELETE_FILE :
            if (action.payload.target === ENTRY_POINT_JSX) {
                return state
            }
            const deleteState = { ...state }
            delete deleteState[action.payload.target]
            return deleteState

        case ActionKind.EDIT_FILE_CONTENT :
            const editContentState = { ...state }
            editContentState[action.payload.target] = action.payload.content
            return editContentState

        case ActionKind.EDIT_FILE_NAME :
            if (action.payload.target === ENTRY_POINT_JSX) {
                return state
            }
            const editedFileContent = state[action.payload.target]
            const editedNameState = { ...state }
            delete editedNameState[action.payload.target]
            editedNameState[action.payload.content] = editedFileContent
            return editedNameState

        default:
            throw new Error()
    }
}

export default function useEsbuild() {
    const [vfs, dispatch] = useReducer(reducer, initialState)

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
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })
    }, [])

    const unpkgPathPlugin = useCallback(() => {
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

              const { data, request } = await axios.get(args.path)
              return {
                loader: 'jsx',
                contents: data,
                resolveDir: new URL('./', request.responseURL).pathname,
              }
            })
          },
        }
    }, [vfs])

    const createBundle = useCallback(async ()=> {
        if (!esbuildRef.current) {
            return
        }

        console.log(esbuildRef.current)

        const bundle = await esbuildRef.current.build({
            entryPoints: ['App.jsx'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()],
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
        vfs,
    }
}