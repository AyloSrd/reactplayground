import Console, { ConsoleMessage } from '@/components/output/Console'
import Iframe, { IFrameMessageTypes } from '@/components/output/Iframe'
import { memo, useCallback, useState } from 'react'

interface Props {
    output: string
}

const MiniBrowser = (props: Props) => {
    const { output } = props

    const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([])
    const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)

    const handleClearConsole = useCallback(() => {
        setConsoleMessages([])
    }, [])

    const handleIframeMessage = useCallback((e) => {
        const iframeMessage = e.detail
        if (iframeMessage.type === IFrameMessageTypes.CONSOLE) {
            const updatedMessages = [
                ...consoleMessages,
                { level: iframeMessage.level, message: iframeMessage.consoleArgs }
            ]
            console.log(consoleMessages, iframeMessage, updatedMessages)
            setConsoleMessages(updatedMessages)
        }

        if (iframeMessage.type === IFrameMessageTypes.ERROR) {
            setConsoleMessages([
                ...consoleMessages,
                { level: 'error', message: iframeMessage.err.message }
            ])
        }
    }, [consoleMessages])

    const handlePageRefresh = useCallback(() => {
        setShouldRefresh(false)
    }, [])

    const handleRequestRefreshClick = useCallback(() => {
        setShouldRefresh(true)
    }, [])

    return (
        <section>
            <nav>
                <button onClick={handleRequestRefreshClick}>
                    Refresh
                </button>
            </nav>
            <Iframe
                onMessage={handleIframeMessage}
                onPageRefresh={handlePageRefresh}
                output={output}
                shouldRefresh={shouldRefresh}
            />
            <Console
                messages={consoleMessages}
                onClear={handleClearConsole}
            />
        </section>
    )
}

export default memo(MiniBrowser)