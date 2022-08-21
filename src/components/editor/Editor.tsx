import TabsContainer from '@/components/editor/TabsContainer'
import usePreviousValue from '@/hooks/playground/usePreviosValue'
import { ENTRY_POINT_JSX, VFS } from '@/hooks/playground/useVFS'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useCreateEvento } from 'evento-react'
import { memo, useState, useCallback, useEffect } from 'react'
import { colors, fixedSizes } from '@/tools/style-tools'
import styled from 'styled-components'
import '@codemirror/autocomplete'

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
    const { files: { fileList: tabs, filesById } } = props
    const [currentFile, setCurrentFile] = useState<string>(filesById['App.jsx'] ? 'App.jsx' : ENTRY_POINT_JSX)

    const prevTabsLength = usePreviousValue(tabs.length)

    const evento = useCreateEvento(props)

    const handleTextChange = useCallback((text: string) => {
        evento('textEditorChange', { file: currentFile, text })
    }, [currentFile])

    const handleTabCreate = useCallback((e: CustomEvent<string>) => {
        evento('addFile', e.detail)
    }, [])

    const handleTabDelete = useCallback((e: CustomEvent<string>) => {
        evento('deleteFile', e.detail)
    }, [])

    const hadleTabEdit = useCallback((e: CustomEvent<{ current: string, next: string }>) => {
        evento('editFileName', e.detail)
    }, [])

    const handleTabSelect = useCallback((e: CustomEvent<string>) => {
        setCurrentFile(e.detail)
    }, [])

    useEffect(() => {
        const tabsLength = tabs.length

        if (!tabs.includes(currentFile)) {
            setCurrentFile(ENTRY_POINT_JSX)
        }

        if (tabsLength > prevTabsLength) {
            setCurrentFile(tabs[tabsLength - 1])
        }
    }, [currentFile, prevTabsLength, tabs])

    return (
        <Container>
            <TabsContainer
                currentTab={currentFile}
                onTabCreate={handleTabCreate}
                onTabDelete={handleTabDelete}
                onTabEdit={hadleTabEdit}
                onTabSelect={handleTabSelect}
                tabs={tabs}
            />
            <Scroller>
                <CodeMirror
                    value={filesById[currentFile]}
                    height="200px"
                    theme="dark"
                    extensions={[javascript({ jsx: true })]}
                    onChange={handleTextChange}
                />
        </Scroller>
        </Container>
    )
}

const Container = styled.section`
    height: 100%;
    max-height: 100%;
    flex-grow: 1;
    display: grid;
    grid-template-rows: ${fixedSizes.editorTabsContainerHeight} 1fr;
`

const Scroller = styled.div`
    overflow-y: auto;
    background-color: ${colors.$bg};
`

export default memo(Editor)
