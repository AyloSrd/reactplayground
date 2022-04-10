import Editor from '@/components/editor/Editor'
import VerticalSplitPane from '@/components/playground/VerticalSplitPane'
import { useState, useCallback } from 'react'

function Playground() {
    const handleTextChange = useCallback((e: CustomEvent<string>) => {
        console.log(e.detail)
    }, [])
    return (
        <>
            <VerticalSplitPane />
            <Editor
                onEditorChange={handleTextChange}
            />
        </>
  )
}

export default Playground