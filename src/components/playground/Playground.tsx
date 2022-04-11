import Editor from '@/components/editor/Editor'
import VerticalSplitPane from '@/components/playground/VerticalSplitPane'
import { useState, useCallback } from 'react'
import styled from 'styled-components'

function Playground() {
    const handleTextChange = useCallback((e: CustomEvent<string>) => {
        console.log(e.detail)
    }, [])
    return (
        <Page>
            <VerticalSplitPane
                leftPaneChild={
                    <Editor
                        onEditorChange={handleTextChange}
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