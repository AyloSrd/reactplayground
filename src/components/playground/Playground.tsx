import Editor from '@/components/editor/Editor'
import Navbar from '@/components/playground/Navbar'
import MiniBrowser from '@/components/output/MiniBrowser'
import VerticalSplitPane from '@/components/esthetic/VerticalSplitPane'
import useEsbuild from '@/hooks/playground/useEsbuild'
import { VFS } from '@/hooks/playground/useVFS'
import { colors } from '@/tools/style-tools'
import { generatePayload } from '@/tools/editor.tools'
import { useCreateEvento } from 'evento-react'
import { useCallback, useEffect } from 'react'
import styled from 'styled-components'

interface Props {
    initialVFS: VFS | null,
    onUpdateVFS: (e: CustomEvent<VFS>) => void,
}

function Playground(props: Props) {
    const {
        addFile,
        createBundle,
        deleteFile,
        editFileContent,
        editFileName,
        files,
        output,
        resetVFS,
        versionGeneratorRef,
        versionRef,
    } = useEsbuild(props.initialVFS)

    const evento = useCreateEvento(props)

    const handleAddFile = useCallback((e: CustomEvent<string>) => {
        addFile(generatePayload(e.detail))
    }, [])

    const handleDeleteFile = useCallback((e: CustomEvent<string>) => {
        if(!confirm(`Do you really want to delete ${e.detail}?`)) {
            return
        }
        deleteFile(generatePayload(e.detail))
    }, [])

    const handleEditFileName = useCallback((
        { detail: { current, next }}: CustomEvent<{ current: string, next: string }>
    ) => {
        editFileName(generatePayload(current, next))
    }, [])

    const handleReloadPlayground = useCallback(() => {
        if(!confirm(`If you remoad this playground, all of your current changes will be lost.
        Do you want to proceed ?`)) {
            return
        }
        resetVFS()
    }, [])

    const handleTextEditorChange = useCallback((
        { detail: { file, text }}: CustomEvent<{ file: string, text: string }>
    ) => {
        editFileContent(generatePayload(file, text))
    }, [])

    useEffect(() => {
        const vfs  = files.filesById

        const timeout = setTimeout(() => {
            if (typeof versionRef.current !== 'number') {
                return
            }
            versionRef.current = versionGeneratorRef.current.next().value
            createBundle(vfs, versionRef.current)
        }, 300)

        evento('updateVFS', vfs)

        return () => clearTimeout(timeout)
    }, [files.filesById])

    return (
        <Page>
            <Navbar onReloadPlayground={handleReloadPlayground} />
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
                    <MiniBrowser
                        output={output}
                    />
                }
            />
        </Page>
    )
}

const Page = styled.div`
    padding-top: 45px;
    height: calc(100vh - 45px);
    width: 100vw;
    max-height: 100%;
    max-width: 100%;
    background-color: ${colors.$bg};
    color: ${colors.$silver200};
`

export default Playground
