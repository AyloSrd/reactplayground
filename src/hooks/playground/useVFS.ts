import { getVersion, libVersionRegex } from '@/tools/esbuild-tools'
import { generatePayload } from '@/tools/editor.tools'
import { useCallback, useReducer } from 'react'

enum ActionKind {
    ADD_FILE = 'ADD_FILE',
    DELETE_FILE = 'DELETE_FILE',
    EDIT_FILE_CONTENT = ' EDIT_FILE_CONTENT',
    EDIT_FILE_NAME = 'EDIT_FILE_NAME',
    RESET_VFS = 'RESET_VFS'
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
    vfs: VFS,
}

export const ENTRY_POINT_JSX = 'index.jsx'

const AppDefaultContent = `
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
        {count}
    </button>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
`.trim()

const defaultState: State = {
    fileList: [ENTRY_POINT_JSX],
    vfs : {
        [ENTRY_POINT_JSX]: AppDefaultContent
    }
}

function init(vfsFromUrl: VFS | null): State {
    if (!vfsFromUrl) {
        return defaultState
    }

    if (!vfsFromUrl[ENTRY_POINT_JSX]) {
        return defaultState
    }

    let tabs = Object.keys(vfsFromUrl)

    if (tabs.indexOf(ENTRY_POINT_JSX) !== 0) {
        tabs = [ENTRY_POINT_JSX, ...tabs.filter(tab => tab !== ENTRY_POINT_JSX)]
    }

    const derivedState = {
        directImports: [],
        fileList: tabs,
        versionedImports: {},
        vfs: vfsFromUrl
    }

    return derivedState
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
                ...state,
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
                ...state,
                fileList: deleteList,
                vfs: deleteVfs
            }

        case ActionKind.EDIT_FILE_CONTENT :
            if (state.vfs[action.payload.target] === undefined) {
                return state
            }
            const editContentVfs = { ...state.vfs }
            editContentVfs[action.payload.target] = action.payload.content
            return {
                ...state,
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
                ...state,
                fileList: editedNameFileList,
                vfs: editedNameVfs
            }

        case ActionKind.RESET_VFS :
            return defaultState

        default:
            throw new Error()
    }
}

export default function useVFS(vfsFromUrl: VFS | null) {
    const [{ vfs, fileList }, dispatch] = useReducer(reducer, vfsFromUrl, init)

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

    const resetVFS = useCallback(() => {
        dispatch({
            type: ActionKind.RESET_VFS,
            payload: generatePayload('')
        })
    }, [])

    return {
        addFile,
        deleteFile,
        editFileContent,
        editFileName,
        fileList,
        resetVFS,
        vfs,
    }
}
