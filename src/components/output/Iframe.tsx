import { sandboxAttributes, srcDoc } from '@/tools/iframe-tools'
import { useCreateEvento } from 'evento-react'
import { memo, useCallback, useEffect, useRef } from 'react'

interface Props {
    onPageRefresh: () => void,
    output: string/*{ code: null | string, error: null | string }*/,
    shouldRefresh: boolean,
}

const Iframe = (props: Props) => {
    const { output, shouldRefresh } = props

    const iframeRef = useRef<HTMLIFrameElement>(null)

    const evento = useCreateEvento(props)

    const handleIframeLoad= useCallback(() => {
        iframeRef?.current?.contentWindow?.postMessage(output, '*')
    }, [output])

    const handleRefresh = useCallback(() => {
        evento('pageRefresh')
    }, [])

    useEffect(() => {
        iframeRef?.current?.contentWindow?.postMessage(output, '*')
    }, [output])

    return (
        <iframe
            onLoad={handleIframeLoad}
            ref={iframeRef}
            sandbox={sandboxAttributes}
            srcDoc={srcDoc}
            title='ReactREPL'
        />
    )
}

export default memo(Iframe)