import Button from '@/components/esthetic/Button'
import ExpandSVG from '@/components/esthetic/icons/ExpandSVG'
import { colors, generalBorderStyle, transitionDuration } from '@/tools/style-tools'
import { useCreateEvento } from 'evento-react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

export interface ConsoleMessage {
    level: 'error' | 'log' | 'warning',
    message: string
}

interface Props {
    messages: ConsoleMessage[],
    onClear: () => any,
}

const Console = (props: Props) => {
    const { messages } = props

    const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false)

    const scrollRef = useRef<HTMLDivElement>(null)

    const evento = useCreateEvento(props)

    const handleClearClick = useCallback(() => {
        evento('clear')
    }, [])

    const handleOpenCloseConsole = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setIsConsoleOpen(e.target.checked)
    }, [])

    useEffect(() => {
        if (isConsoleOpen) {
            scrollRef?.current?.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }, [messages])

    return (
        <Section>
            <Nav>
                <Label htmlFor="open-close">
                    <OpenCloseCheckbox
                        checked={isConsoleOpen}
                        id='open-close'
                        onChange={handleOpenCloseConsole}
                        type='checkbox'
                        />
                    <ExpandSVG
                        direction={isConsoleOpen ? "down" : "up"}
                        height={"20px"}
                        width={"20px"}
                    />
                    Console ({messages.length})
                </Label>
                <Button onClick={handleClearClick}>
                    <BtnContent>Clear</BtnContent>
                </Button>
            </Nav>
            <ConsoleBody
                className={ isConsoleOpen ? 'open' : 'closed'}
            >
                <UnorderedList>
                    {
                        messages.map(({ level, message }, i) => (

                            <Message
                                key={i}
                                className={level}
                            >
                                <pre>{message}</pre>
                            </Message>

                        ))
                    }
                </UnorderedList>
                <div ref={scrollRef}/>
            </ConsoleBody>
        </Section>
    )
}

const Section = styled.section`
    background-color: ${colors.$bg};
    justify-self: stretch;
    display: flex;
    flex-direction: column;
    min-width: 0;
`

const ConsoleBody = styled.div`
    overflow: auto;
    min-width: 0;

    &.open {
        height: 200px;
        max-height: 200px;
        transition: ${transitionDuration.fast};
        border-top: ${generalBorderStyle};

    }

    &.closed {
        height: 200px;
        max-height: 0;
        transition: ${transitionDuration.fast};
    }
`

const BtnContent = styled.span`
    color: ${colors.$silver200};

    &:hover {
        color: ${colors.$silver100};
        text-decoration: underline;
    }
`

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
`

const UnorderedList = styled.ul`
    display: block;
    list-style-type: inside;
    padding: 0;
    /* overflow: auto; */
    min-width: 0;
`

const Message = styled.li`
    display: block;
    min-width: 100%;
    width: fit-content;
    padding: 0 0 0 30px;

    &.error {
        background-color: ${colors.$redConsole};
    }

    &.warn {
        background-color: ${colors.$yellowConsole};
    }

    & pre {
        margin: 0;
        padding: 10px 0;
        /* white-space: pre-wrap; */
    }
`

const Label = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        color: ${colors.$silver100};
    }
`

const OpenCloseCheckbox = styled.input`
    display: none;
`

export default memo(Console)
