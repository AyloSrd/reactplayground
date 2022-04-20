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
    onTextEditorChange: (e: CustomEvent<{ file: string, text: string }>) => void,
}

function Editor(props: Props) {
    const { files: { fileList: tabs, filesById} } = props
    const [currentFile, setCurrentFile] = useState<string>(ENTRY_POINT_JSX)

    const evento = useCreateEvento(props)

    // const writeFile = useCallback((file: string, text: string) => {
    //     evento('textEditorChange', { file, text })
    // }, [])
    const handleTextChange = useCallback((e: CustomEvent<string>) => {
        evento('textEditorChange', { file: currentFile, text: e.detail })
    }, [currentFile])

    const handleTabCreate = useCallback((e: CustomEvent<string>) => {
        evento('addFile', e.detail)
    }, [])

    const handleTabDelete = useCallback((e: CustomEvent<string>) => {
        evento('deleteFile',e.detail)
    }, [])

    const hadleTabEdit = useCallback((e: CustomEvent<{ current: string, next: string }>) => {
        evento('editFileName', e.detail)
    }, [])

    const handleTabSelect = useCallback((e: CustomEvent<string>) => {
        setCurrentFile(e.detail)
    }, [])

    useEffect(() => {
        console.log('useEffect tabs currentFile', tabs, currentFile)
        if (!tabs.includes(currentFile)) {
            setCurrentFile(ENTRY_POINT_JSX)
        }
    }, [currentFile, tabs])

    console.log(filesById)
    console.log('currentFile', currentFile)

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
                text={filesById[currentFile]}
            />
        </Container>
  )
}

const Container = styled.section`
    height: 100%;
`

export default memo(Editor)
