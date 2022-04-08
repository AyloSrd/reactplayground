import { useCreateEvento } from 'evento-react'
import { Controlled } from 'react-codemirror2'
import { useState, useCallback } from 'react'
import * as codemirror from 'codemirror';

import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/xml/xml'
import 'codemirror/theme/material.css'

interface Props {
    onBeforeTextChange: (e: CustomEvent<string>) => void,
    value: string,
}

const CodeMirror = (props) => {
    // const { value = 'yo' } = props
    const [value, setValue] = useState('yo')

    const evento = useCreateEvento(props)

    const handleBeforeChange = (
        editor: codemirror.Editor, 
        data: codemirror.EditorChange, 
        text: string
    ) => {
        evento('beforeTextChange', text)
    }

    return (
        <div>
            <Controlled
                onBeforeChange={(e, d, t) => setValue(t)}
                value={value}
            />
        </div>
    )
}

export default CodeMirror