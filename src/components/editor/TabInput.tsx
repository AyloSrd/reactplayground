import { ENTRY_POINT_JSX } from '@/hooks/playground/useVFS'
import { useCreateEvento } from 'evento-react'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '@/tools/style-tools'

interface Props {
    onNewNameSubmit: (e: CustomEvent<{ current: string; next: string }>) => void,
    tab: string
}

function TabInput(props: Props) {
    const { tab } = props
    const [ name, type ] = tab.split('.')

    const [tempName, setTempName] = useState<string>(name)

    const inputRef = useRef<HTMLInputElement>(null)

    const evento = useCreateEvento(props)

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTempName(e.target.value)
    }, [])

    const handleSubmit = useCallback((e?: React.FormEvent<HTMLFormElement>): void => {
        e?.preventDefault()

        if (`${tempName}.${type}` === ENTRY_POINT_JSX) {
            return
        }

        evento('newNameSubmit', { current: tab, next: `${tempName}.${type}` })
    }, [tab, tempName])

    const handleBlur = useCallback(() => {
        handleSubmit()
    }, [handleSubmit])

    useEffect(() => {
      inputRef.current?.select()
    }, [])

    return (
        <Container>
            <Flex>
                <form
                    onBlur={handleBlur}
                    onSubmit={handleSubmit}
                    >
                    <Input
                        onChange={handleChange}
                        ref={inputRef}
                        type="text"
                        value={tempName}
                    />
                </form>
                <span>
                    .{type}
                </span>
            </Flex>
        </Container>
    )
}

const Container = styled.li`
    height: 100%;
    padding: 5px 5px 5px 0;
    display: block;
    flex: 0 0 auto;
    position: relative;
    box-shadow: inset 0px -2px 0px 0px ${colors.$react};
`
const Flex = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`

const Input = styled.input`
    padding: 0;
    height: 30px;
    width: 80px;
    border: none;
    box-shadow: inset 0px -1px 0px 0px ${colors.$silver100};
    color: ${colors.$silver100};
    background-color: ${colors.$bgNav};
`

export default memo(TabInput)