import CodeMirror from '@/components/editor/CodeMirror'
import Tabs from '@/components/editor/Tabs'
import { useCreateEvento } from 'evento-react'
import { memo, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'

interface Props {
    curr
    onEditorChange: (e: CustomEvent<string>) => void,
    tabs: string[]
}

function Editor(props: Props) {
    const { tabs } = props
    const [ text, setText ] = useState('yo')

    const evento = useCreateEvento(props)

    const handleTextChange = useCallback((e: CustomEvent<string>) => {
        setText(e.detail)
    }, [])

    useEffect(() => {
        evento('editorChange', text)
    }, [text])

    return (
        <Container>
            <Tabs tabs={tabs} />
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
