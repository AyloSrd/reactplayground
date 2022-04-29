import Console, { ConsoleMessage } from '@/components/output/Console'
import Iframe, { IFrameMessageTypes } from '@/components/output/Iframe'
import { colors } from '@/tools/style-tools'
import { memo, useCallback, useState } from 'react'
import styled from 'styled-components'

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
            setConsoleMessages(prevConsoleMessages => [
                ...prevConsoleMessages,
                { level: iframeMessage.level, message: iframeMessage.consoleArgs }
            ])
        }

        if (iframeMessage.type === IFrameMessageTypes.ERROR) {
            setConsoleMessages(prevConsoleMessages => [
                ...prevConsoleMessages,
                { level: 'error', message: iframeMessage.err.message }
            ])
        }
    }, [])

    const handlePageRefresh = useCallback(() => {
        handleClearConsole()
        setShouldRefresh(false)
    }, [])

    const handleRequestRefreshClick = useCallback(() => {
        setShouldRefresh(true)
    }, [])

    return (
        <Container>
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
        </Container>
    )
}

const Container = styled.section`
    background-color: ${colors.$silver100};
    height: 100%;
    display: grid;
    grid-template-rows: 50px 1fr auto;
`

export default memo(MiniBrowser)