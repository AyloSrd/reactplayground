import { sandboxAttributes, srcDoc } from '@/tools/iframe-tools'
import { useCreateEvento } from 'evento-react'
import { memo, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

export enum IFrameMessageTypes {
    CONSOLE = 'console',
    ERROR = 'error'
}

interface IFrameConsoleMessage {
    consoleArgs: string,
    level: 'error' | 'log' | 'warn',
    type: 'console',
}

interface IFrameErrorMessage {
    err: Error,
    type: 'error',
}

export type IframeMessage = IFrameConsoleMessage | IFrameErrorMessage

interface Props {
    onPageRefresh: () => void,
    output: string/*{ code: null | string, error: null | string }*/,
    onMessage: (e: CustomEvent<IframeMessage>) => void,
    shouldRefresh: boolean,
}

const Iframe = (props: Props) => {
    const { output, shouldRefresh } = props

    const iframeRef = useRef<HTMLIFrameElement>(null)

    const evento = useCreateEvento(props)

    const handleIframeLoad= useCallback(() => {
        iframeRef?.current?.contentWindow?.postMessage(output, '*')
    }, [output])


    const handleIframeMessage = useCallback(e => {
        if (e.source === iframeRef?.current?.contentWindow) {
            evento('message', e.data as IframeMessage)
        }
    }, [])

    useEffect(() => {
        if (shouldRefresh && iframeRef && iframeRef.current) {
            iframeRef.current.srcdoc = srcDoc
            evento('pageRefresh')
        }
        iframeRef?.current?.contentWindow?.postMessage(output, '*')
    }, [output, shouldRefresh])

    useEffect(() => {
        window.addEventListener('message', handleIframeMessage)
        return  window.removeEventListener('message', handleIframeLoad)
    }, [])

    return (
        <StyledIframe
            onLoad={handleIframeLoad}
            ref={iframeRef}
            sandbox={sandboxAttributes}
            srcDoc={srcDoc}
            title='ReactREPL'
        />
    )
}

const StyledIframe = styled.iframe`
    border: none;
    height: 100%;
    width: 100%;
`

export default memo(Iframe)