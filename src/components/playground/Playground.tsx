import Editor from '@/components/editor/Editor'
import VerticalSplitPane from '@/components/playground/VerticalSplitPane'
import{ unpkgPathPlugin } from '@/tools/esbuild-tools'
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

        const bundle = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()],
            // @ts-ignore, this is necessary because vite will automatically escape and replace the string "process.env.NODE_ENV"
            define: window.defineHack,
          });

        console.log('bundle', bundle)
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