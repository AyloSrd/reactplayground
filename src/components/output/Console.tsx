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
        <section>
            <nav>
                <button onClick={handleClearClick}>
                    Clear
                </button>
                <Label htmlFor="open-close">
                    Console ({messages.length})
                    <OpenCloseCheckbox
                        checked={isConsoleOpen}
                        id='open-close'
                        onChange={handleOpenCloseConsole}
                        type='checkbox'
                    />
                    {
                        isConsoleOpen ?
                            'close'
                        :
                            'open'
                    }
                </Label>
            </nav>
            <ConsoleBody
                className={ isConsoleOpen ? 'open' : 'closed'}
            >
                <StyledUl>
                    {
                        messages.map(({ level, message }, i) => (

                            <div key={i}>
                                <Message
                                    className={level}
                                >
                                    {message}
                                </Message>
                            </div>

                        ))
                    }
                </StyledUl>
                <div ref={scrollRef}/>
            </ConsoleBody>
        </section>
    )
}

const ConsoleBody = styled.div`
    overflow: auto;

    &.open {
        height: 200px;
        transition: 100ms;
    }

    &.closed {
        max-height: 0;
        transition: 100ms;
    }
`

const StyledUl = styled.ul`
    list-style-type: inside;
`

const Message = styled.li`
    &::marker {
        content: '';
    }

    &.error {
        background-color: red;
    }

    &.error::marker {
        content: '❌'
    }

    &.warn {
        background-color: yellow;
    }

    &.warn::marker {
        content: '⚠️'
    }
`

const Label = styled.label`
    cursor: pointer;
`

const OpenCloseCheckbox = styled.input`
    display: none;
`

export default memo(Console)