import Button from '@/components/esthetic/Button'
import RefreshSVG from '@/components/esthetic/icons/RefreshSVG'
import Iframe from '@/components/output/Iframe'
import { OutputType } from '@/hooks/playground/useEsbuild'
import { colors, fixedSizes, generalBorderStyle, transitionDuration } from '@/tools/style-tools'
import { Hook, Console, Decode } from 'console-feed'
import { Message } from 'console-feed/lib/definitions/Component'
import { memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
    output: OutputType,
}

const MiniBrowser = (props: Props) => {
    const { output } = props

    const [logs, setLogs] = useState<Message[]>([])
    const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)

    const handleConsoleMessage = useCallback((log: Message[]) => {

        setLogs(
            log[0].method === 'clear'
                ? []
                : (currLogs: Message[]) => ([...currLogs, Decode(log)] as Message[])
        )
    }, [Decode])

    const handleLoad = useCallback((evt: CustomEvent<Window>) => {
        Hook(
            // @ts-ignore : Window type soens't have console
            evt.detail.console,
            // @ts-ignore : cannot make make ts work with this callback
            handleConsoleMessage,
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