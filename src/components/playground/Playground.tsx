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

    const handleAddFile = useCallback((e: CustomEvent<string>) => {
        addFile(generatePayload(e.detail))
    }, [])

    const handleDeleteFile = useCallback((e: CustomEvent<string>) => {
        deleteFile(generatePayload(e.detail))
    }, [])

    const handleEditFileName = useCallback((
        { detail: { current, next }}: CustomEvent<{ current: string, next: string }>
    ) => {
        editFileName(generatePayload(current, next))
    }, [])

    const handleTextEditorChange = useCallback((
        { detail: { file, text }}: CustomEvent<{ file: string, text: string }>
    ) => {
        editFileContent(generatePayload(file, text))
    }, [])

    const getSrcDoc =(bundle: string) => `
    <html>
    <body>
    <div id="root"></div>
    <script>
    ${bundle}
    </script>
  </body>
    </html>

    `

    useEffect(() => {
        const timeout = setTimeout(() => {
            createBundle(files.filesById)
        }, 300)

        return () => clearTimeout(timeout)
    }, [files.filesById])

    console.log(bundleJSXText)

    return (
        <Page>
            <VerticalSplitPane
                leftPaneChild={
                    <Editor
                        onAddFile={handleAddFile}
                        onDeleteFile={handleDeleteFile}
                        onEditFileName={handleEditFileName}
                        files={files}
                        onTextEditorChange={handleTextEditorChange}
                    />
                }
                rightPaneChild={
                    <iframe
                        title="React REPL"
                        // @ts-ignore
                        sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin"
                        srcDoc={getSrcDoc(bundleJSXText)}
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