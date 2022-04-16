import CodeMirror from '@/components/editor/CodeMirror'
import TabsContainer from '@/components/editor/TabsContainer'
import { ENTRY_POINT_JSX, VFS } from '@/hooks/playground/useEsbuild'
import { useCreateEvento } from 'evento-react'
import { generateNewTabName } from '@/tools/eidtor.tools'
import { memo, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

interface Props {
    files: {
        fileList: string[],
        filesById: VFS
    }
    onAddFile: (e: CustomEvent<string>) => void,
    onDeleteFile: (e: CustomEvent<string>) => void,
    onEditFileName: (e: CustomEvent<{ current: string, next: string }>) => void,
    onTextEditorChange: (e: CustomEvent<string>) => void,
}

function Editor(props: Props) {
    const { files: { fileList: tabs, filesById} } = props
    const [ text, setText ] = useState(filesById[ENTRY_POINT_JSX])
    const [currentFile, setCurrentFile] = useState<string>(ENTRY_POINT_JSX)

    const evento = useCreateEvento(props)

    const handleTextChange = useCallback((e: CustomEvent<string>) => {
        setText(e.detail)
    }, [])

    const handleTabCreate = useCallback(() => {
        evento('addFile', generateNewTabName(tabs))
    }, [tabs])

    const handleTabDelete = useCallback((e: CustomEvent<string>) => {
        evento('deleteFile', e.detail)
    }, [])

    const hadleTabEdit = useCallback((e: CustomEvent<{ current: string, next: string }>) => {
        evento('editFileName', e.detail)
    }, [])

    const handleTabSelect = useCallback((e: CustomEvent<string>) => {
        const tab = e.detail
        setCurrentFile(tab)
        setText(filesById[tab])
    }, [filesById])

    useEffect(() => {
        evento('textEditorChange', text)
    }, [text])

    return (
        <Container>
            <TabsContainer
                currentTab={currentFile}
                onTabCreate={handleTabCreate}
                onTabDelete={handleTabDelete}
                onTabEdit={hadleTabEdit}
                onTabSelect={handleTabSelect}
                tabs={tabs} />
            <CodeMirror
                language='jsx'
                onTextChange={handleTextChange}
                text={text}
            />
        </Container>
  )
}

const Container = styled.section`
    height: 100%;
`

export default memo(Editor)
