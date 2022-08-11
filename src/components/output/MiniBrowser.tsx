import Button from '@/components/esthetic/Button'
import RefreshSVG from '@/components/esthetic/icons/RefreshSVG'
import Iframe from '@/components/output/Iframe'
import { OutputType } from '@/hooks/playground/useEsbuild'
import { colors, fixedSizes, generalBorderStyle, transitionDuration } from '@/tools/style-tools'
import { Hook, Console, Decode } from 'console-feed'
import { memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
    output: OutputType,
}

const MiniBrowser = (props: Props) => {
    const { output } = props

    const [logs, setLogs] = useState([])
    const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)

    const handleLoad = useCallback((evt: CustomEvent<Window>) => {
        Hook(
            // @ts-ignore
            evt.detail.console,
            log => setLogs(currLogs => [...currLogs, Decode(log)]),
            true,
            100,
        )
    }, [])

    const handleClearConsole = useCallback(() => {
        //setConsoleMessages([])
    }, [])

    const handleIframeMessage = useCallback((e) => {
        const iframeMessage = e.detail

        // if (iframeMessage.type === IFrameMessageTypes.CONSOLE) {
        //     // setConsoleMessages(prevConsoleMessages => [
        //     //     ...prevConsoleMessages,
        //     //     { level: iframeMessage.level, message: iframeMessage.consoleArgs }
        //     ])
        // }

        // if (iframeMessage.type === IFrameMessageTypes.ERROR) {
        //     setConsoleMessages(prevConsoleMessages => [
        //         ...prevConsoleMessages,
        //         { level: 'error', message: iframeMessage.err.message }
        //     ])
        // }
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
            // setConsoleMessages(prevConsoleMessages => [
            //     ...prevConsoleMessages,
            //     { level: 'error', message: output.error }
            // ])
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
                onLoad={handleLoad}
                onMessage={handleIframeMessage}
                onPageRefresh={handlePageRefresh}
                output={output}
                shouldRefresh={shouldRefresh}
            />
            <div style={{ backgroundColor: 'black', height: '200px'}}>
                <Console
                    filter={['log','debug', 'info', 'warn', 'error', 'table', 'time', 'timeEnd' ,'count' ,'assert']}
                    logs={logs}
                    styles={{ BASE_FONT_FAMILY: "'Ubuntu Mono', 'Courier New', monospace;", LOG_BACKGROUND: colors.$bg, LOG_BORDER: colors.$silver300 }}
                    variant={"dark"}
                />
            </div>
        </Container>
    )
}

const BtnContent = styled.div`
    transition: transform ${transitionDuration.fast};

    &:hover {
        color: ${colors.$silver100};
    }
`

const Container = styled.section`
    background-color: ${colors.$silver100};
    height: 100%;
    flex-grow: 1;
    display: grid;
    grid-template-rows: ${fixedSizes.editorTabsContainerHeight} 1fr auto;
`

const Nav = styled.nav`
    background-color: ${colors.$bg};
    display: flex;
    align-items: center;
    padding-left: 10px;
    border-bottom: ${generalBorderStyle};
`

export default memo(MiniBrowser)