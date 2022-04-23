import Editor from '@/components/editor/Editor'
import Iframe from '@/components/output/Iframe'
import VerticalSplitPane from '@/components/playground/VerticalSplitPane'
import useEsbuild, { VFS } from '@/hooks/playground/useEsbuild'
import { generatePayload } from '@/tools/editor.tools'
import { useCreateEvento } from 'evento-react'
import { useCallback, useEffect } from 'react'
import styled from 'styled-components'

interface Props {
    initialVFS?: VFS,
    onUpdateVFS: (e: CustomEvent<VFS>) => void,
}

function Playground(props: Props) {
    const {
        addFile,
        bundleJSXText,
        createBundle,
        deleteFile,
        editFileContent,
        editFileName,
        files
    } = useEsbuild()

    const evento = useCreateEvento(props)

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

    useEffect(() => {
        const vfs  = files.filesById

        const timeout = setTimeout(() => {
            createBundle(vfs)
        }, 300)

        evento('updateVFS', vfs)
        console.log('updated')

        return () => clearTimeout(timeout)
    }, [files.filesById])

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
                    <Iframe
                        onPageRefresh={() => console.log('refreshed')}
                        output={bundleJSXText}
                        shouldRefresh={false}
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