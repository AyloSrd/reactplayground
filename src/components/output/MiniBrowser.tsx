import Button from '@/components/esthetic/Button'
import RefreshSVG from '@/components/esthetic/icons/RefreshSVG'
import Console, { ConsoleMessage } from '@/components/output/Console'
import Iframe, { IFrameMessageTypes } from '@/components/output/Iframe'
import { OutputType } from '@/hooks/playground/useEsbuild'
import { colors, transitionDuration } from '@/tools/style-tools'
import { memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
    output: OutputType,
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

    useEffect(() => {
        if (output.error) {
            setConsoleMessages(prevConsoleMessages => [
                ...prevConsoleMessages,
                { level: 'error', message: output.error }
            ])
        }
    }, [output.error])

    return (
        <Container>
            <Nav>
                <Button onClick={handleRequestRefreshClick}>
                    <BtnContent>
                        <RefreshSVG height="28px" width="28px" />
                    </BtnContent>
                </Button>
            </Nav>
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

const BtnContent = styled.div`
    transition: transform ${transitionDuration.medium};

    &:hover {
        color: ${colors.$silver100};
    }
`

const Container = styled.section`
    background-color: ${colors.$silver100};
    height: 100%;
    flex-grow: 1;
    display: grid;
    grid-template-rows: 45px 1fr auto;
`

const Nav = styled.nav`
    background-color: ${colors.$bg};
    display: flex;
    align-items: center;
    padding-left: 10px;
`

export default memo(MiniBrowser)