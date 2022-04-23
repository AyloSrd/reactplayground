import { defaultOptions } from '@/tools/codemirror-tools';

import { useCreateEvento } from 'evento-react'
import { Controlled } from 'react-codemirror2'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import * as codemirror from 'codemirror'
import styled from 'styled-components'

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/xml/xml'
import 'codemirror/theme/material.css'
import 'code-mirror-themes/themes/rdark.css'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/edit/closetag.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/xml-fold.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'

interface Props {
    language: 'javascript' | 'jsx'
    onTextChange: (e: CustomEvent<string>) => void,
    text: string,
}

function CodeMirror(props: Props) {
    const { language, text } = props

    const [hasMounted, setHasMounted] = useState<boolean>(false)

    const editorRef = useRef<any>(null)

    const options = {
        ...defaultOptions,
        mode: language
    }

    const evento = useCreateEvento(props)

    const handleBeforeChange = useCallback((
        editor: codemirror.Editor,
        data: codemirror.EditorChange,
        value: string
    ) => {
        evento('textChange', value)
    }, [props])

    useEffect(() => {
        console.log('mounted')
        setHasMounted(true)
        editorRef?.current?.editor?.focus()
    }, [])

    return (
        <Container>
            <Controlled
                onBeforeChange={handleBeforeChange}
                options={options}
                ref={editorRef}
                value={hasMounted ? text : ""}
            />
        </Container>
    )
}

const Container = styled.div`
    /* height: 100%; */
    width: 100%;

    .react-codemirror2 {
        width: 100%;
        height: 100%;
    }

    .CodeMirror {;
        width: 100%;
        height: calc(100% - 50px);
    }

    .cm-s-rdark .cm-tag:not(.cm-bracket) {
        color: #5BA1CF;
    }

    .cm-s-rdark .cm-string {
        color: #e6d238;
    }
}
`

export default memo(CodeMirror)