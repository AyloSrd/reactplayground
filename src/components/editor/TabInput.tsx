import { ENTRY_POINT_JSX } from '@/hooks/playground/useVFS'
import { useCreateEvento } from 'evento-react'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '@/tools/style-tools'
import { validateTabName } from '@/tools/editor.tools'

interface Props {
    existingTabNames: string[],
    onNewNameSubmit: (e: CustomEvent<{ current: string; next: string }>) => void,
    tab: string
}

function TabInput(props: Props) {
    const { existingTabNames, tab } = props

    const [tempName, setTempName] = useState<string>(tab)

    const inputRef = useRef<HTMLInputElement>(null)
    const errorsRef = useRef<Array<string>>([])
    const evento = useCreateEvento(props)

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTempName(e.target.value)
        errorsRef.current = validateTabName(e.target.value, tab, existingTabNames)
    }, [tab, existingTabNames])

    const handleSubmit = useCallback((e?: React.FormEvent<HTMLFormElement>): void => {
        e?.preventDefault()

        if (errorsRef.current.length > 0) {
            alert(errorsRef.current[0])
            return
        }

        evento('newNameSubmit', { current: tab, next: tempName })
    }, [tempName])

    const handleBlur = useCallback(() => {
        if (errorsRef.current.length > 0) {
            inputRef.current?.select()
            return
        }
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
            </Flex>
        </Container>
    )
}

const Container = styled.li`
    height: 100%;
    padding: 5px;
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
    width: 100px;
    border: none;
    box-shadow: inset 0px -1px 0px 0px ${colors.$silver100};
    color: ${colors.$silver100};
    background-color: ${colors.$bg};
`

export default memo(TabInput)