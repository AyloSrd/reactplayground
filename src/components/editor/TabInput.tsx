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

    const evento = useCreateEvento(props)

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTempName(e.target.value)
    }, [])

    const handleSubmit = useCallback((e?: React.FormEvent<HTMLFormElement>): void => {
        e?.preventDefault()

        if (!tempName.length) {
            alert('You have to chose a name!')
            inputRef.current?.focus()
            return
        }

        if (
            tempName === ENTRY_POINT_JSX
            || (
                tempName !== tab
                && existingTabNames.includes(tempName)
            )
        ) {
            alert(`A file named ${tempName} already exists. Please be creative, find another one.`)
            inputRef.current?.select()
            return
        }

        if (!validateTabName(tempName)) {
            alert('You can only use letters and digits in the file name.')
            inputRef.current?.select()
            return
        }


        const format= tempName.split('.')[1]

        if (!format || !['js', 'jsx', 'css'].includes(format)) {
            alert('Please chose one of the following file formats: js, jsx or css')
            inputRef.current?.select()
            return
        }

        evento('newNameSubmit', { current: tab, next: tempName })
    }, [existingTabNames, tab, tempName])

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