import Editor from '@/components/editor/Editor'
import { useState, useCallback } from 'react'

function Playground() {
    const handleTextChange = useCallback((e: CustomEvent<string>) => {
        console.log(e.detail)
    }, [])
    return (
        <Editor
            onEditorChange={handleTextChange}
        />
  )
}

export default Playground