import { ENTRY_POINT_JSX } from '@/hooks/playground/useVFS'
import DeleteButton from '@/components/esthetic/DeleteButton'
import { TabContainer } from '@/components/editor/Tab'
import { useCreateEvento } from 'evento-react'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
    onDelete: (e: CustomEvent<string>) => void,
    onNewNameSubmit: (e: CustomEvent<{ current: string; next: string }>) => void,
    tab: string
}

function TabInput(props: Props) {
    const { tab } = props
    const [ name, type ] = tab.split('.')

    const isEntryPoint = tab === ENTRY_POINT_JSX

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

    const handleDeleteClick = useCallback(() => {
        if (isEntryPoint) {
            return
        }
        evento('delete', tab)
    }, [tab])

    useEffect(() => {
      inputRef.current?.select()
    }, [])

    return (
        <Container>
            <form
                onBlur={handleBlur}
                onSubmit={handleSubmit}
                >
                <input
                    onChange={handleChange}
                    ref={inputRef}
                    type="text"
                    value={tempName}
                />
            </form>
            <span>
                .{type}
            </span>
            <DeleteButton
                onClick={handleDeleteClick}
            />
        </Container>
    )
}

const Container = styled.li`
    display: block;
    flex: 0 0 auto;
    position: relative;
`
const Flex = styled.div`
    display: flex;
`

export default memo(TabInput)