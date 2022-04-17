import Editor from '@/components/editor/Editor'
import VerticalSplitPane from '@/components/playground/VerticalSplitPane'
import useEsbuild from '@/hooks/playground/useEsbuild'
import { ENTRY_POINT_JSX } from '@/hooks/playground/useEsbuild'
import { useState, useCallback, useEffect, useRef } from 'react'
import { generatePayload } from '@/tools/eidtor.tools'
import styled from 'styled-components'

function Playground() {
    const {
        addFile,
        bundleJSXText,
        createBundle,
        deleteFile,
        editFileContent,
        editFileName,
        files
    } = useEsbuild()

    const handleTextChange = useCallback((e: CustomEvent<string>) => {
        console.log(e.detail)
    }, [])

    const handleAddFile = useCallback((e: CustomEvent<string>) => {
        addFile(generatePayload(e.detail))
    }, [])

    const handleDeleteFile = useCallback((e: CustomEvent<string>) => {
        deleteFile(generatePayload(e.detail))
    }, [])

    const handleEditFileName = useCallback(({ detail: { current, next }}: CustomEvent<{ current: string, next: string }>) => {
        editFileName(generatePayload(current, next))
    }, [])

    const handleClick = () => createBundle()

    useEffect(() => {
        console.log(bundleJSXText)
    }, [bundleJSXText])

    return (
        <Page>
            <button onClick={handleClick}>click</button>
            <VerticalSplitPane
                leftPaneChild={
                    <Editor
                        onAddFile={handleAddFile}
                        onDeleteFile={handleDeleteFile}
                        onEditFileName={handleEditFileName}
                        files={files}
                        onTextEditorChange={handleTextChange}
                    />
                }
            />
        </Page>
  )
}

const Page = styled.div`
    height: 100vh;
    width: 100vw;
    max-height: 100vh;
    max-width: 100%;
`

export default Playground