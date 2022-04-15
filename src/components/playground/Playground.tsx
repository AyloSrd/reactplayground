import Editor from '@/components/editor/Editor'
import VerticalSplitPane from '@/components/playground/VerticalSplitPane'
import useEsbuild from '@/hooks/playground/useEsbuild'
import { ENTRY_POINT_JSX } from '@/hooks/playground/useEsbuild'
import { useState, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

function Playground() {
    const {
        addFile,
        bundleJSXText,
        createBundle,
        deleteFile,
        editFileContent,
        editFileName,
        files: {
            fileList,
            filesById
        },
    } = useEsbuild()

    const [currentTab, setCurrentTab] = useState(ENTRY_POINT_JSX)

    const handleTextChange = useCallback((e: CustomEvent<string>) => {
        console.log(e.detail)
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
                        onEditorChange={handleTextChange}
                        tabs={fileList}
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