import Button from '@/components/esthetic/Button'
import RefreshSVG from '@/components/esthetic/icons/RefreshSVG'
import Iframe from '@/components/output/Iframe'
import { OutputType } from '@/hooks/playground/useEsbuild'
import { colors, fixedSizes, generalBorderStyle, transitionDuration } from '@/tools/style-tools'
import Console from '@/components/output/Console'
import { Hook, Decode } from 'console-feed'
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
        setLogs([])
    }, [])

    const handlePageRefresh = useCallback(() => {
        handleClearConsole()
        setShouldRefresh(false)
    }, [])

    const handleRequestRefreshClick = useCallback(() => {
        setShouldRefresh(true)
    }, [])

    useEffect(() => {
        handleClearConsole()
    }, [output])

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
                onPageRefresh={handlePageRefresh}
                output={output}
                shouldRefresh={shouldRefresh}
            />
            <Console
                logs={logs}
                onClear={handleClearConsole}
            />
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