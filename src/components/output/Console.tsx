import { useCreateEvento } from 'evento-react'
import { memo, useCallback } from 'react'
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

    const evento = useCreateEvento(props)

    const handleClick = useCallback(() => {
        evento('clear')
    }, [])

    return (
        <section>
            <nav>
                <button onClick={handleClick}>
                    Clear
                </button>
            </nav>
            <div>
                <ul>
                    {
                        messages.map(({ level, message }, i) => (
                            <Message
                                key={i}
                                level={level}
                            >
                                {message}
                            </Message>

                        ))
                    }
                </ul>
            </div>

        </section>
    )
}

const Message = styled.li`
    color: ${(props: { level: 'error' | 'log' | 'warning' }) =>
        props.level === 'error' ?
            'red'
        : props.level === 'log' ?
            'grey'
        :
            'yellow'
    }
`

export default memo(Console)