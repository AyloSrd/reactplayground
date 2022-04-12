import Editor from '@/components/editor/Editor'
import VerticalSplitPane from '@/components/playground/VerticalSplitPane'
import * as esbuild from 'esbuild-wasm'
import { useState, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

function Playground() {
    const handleTextChange = useCallback((e: CustomEvent<string>) => {
        console.log(e.detail)
    }, [])

    const ref = useRef<any>()

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })
    }

    const handleClick = async () => {
        if (!ref.current) {
            return
        }

        console.log(ref.current)

        const transpiled = await ref.current.transform('const Test = () => <div>test</div>', {
            loader: 'jsx',
            target: 'es2015'
        })

        console.log('transpiled', transpiled)
    }

    useEffect(() => {
        startService()
    }, [])

    return (
        <Page>
            <button onClick={handleClick}>click</button>
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