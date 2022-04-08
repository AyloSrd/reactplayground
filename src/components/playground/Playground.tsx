import Editor from '@/components/editor/Editor'
import { useState, useCallback } from 'react'

function Playground() {
    const [ text, setText ] = useState('yo')
    const handleTextChange = useCallback((e: CustomEvent<string>) => {
        setText(e.detail)
    }, [])
    return (
        <Editor
            onTextChange={handleTextChange}
            text={text}
        />
  )
}

export default Playground