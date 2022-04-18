import { ENTRY_POINT_JSX } from '@/hooks/playground/useEsbuild'
import { useCreateEvento } from 'evento-react'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
    currentTab: string,
    onDelete: (e: CustomEvent<string>) => void,
    ongit NewNameSubmit: (e: CustomEvent<{current: string, next: string}>) => void,
    onSelect: (e: CustomEvent<string>) => void,
    tab: string
}

function NewTab(props: Props) {
    const { tab } = props
    const [ name, type ] = tab.split('.')

    const isEntryPoint = tab === ENTRY_POINT_JSX

    const [tempName, setTempName] = useState<null | string>(null)

    const inputRef = useRef<HTMLInputElement>(null)

    const evento = useCreateEvento(props)

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTempName(e.target.value)
    }, [])

    const handleTabClick = useCallback(() => {
        evento('select', tab)
    }, [tab])

    const handleSubmit = useCallback((e?: React.FormEvent<HTMLFormElement>): void => {
        e?.preventDefault()
        if (`${tempName}.${type}` === ENTRY_POINT_JSX) {
            setTempName(null)
            return
        }

        evento('edit', { current: tab, next: `${tempName}.${type}`}).then(res => {
            if (res) {
                setTempName(null)
            }
        })
    }, [tab, tempName])

    const handleBlur = useCallback(() => {
        handleSubmit()
    }, [handleSubmit])

    const handleDeleteCkick = useCallback(() => {
        if (isEntryPoint) {
            return
        }
        evento('delete', tab)
    }, [tab])

    useEffect(() => {
      inputRef.current?.focus()
    }, [tempName])

    useEffect(() => {
        if (!isEntryPoint) {
            setTempName(name)
        }
    }, [])

    return (
        <TabContainer>
            <span  onClick={handleTabClick}>
                {
                    typeof tempName === 'string' ?
                        <span>
                            <span>
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
                            </span>
                            <span>
                                .{type}
                            </span>
                        </span>
                    :
                        <span onDoubleClick={handleDoubleClick}>
                            {tab}
                        </span>
                }
            </span>
            <span onClick={handleDeleteCkick}>
                x
            </span>
        </TabContainer>
    )
}

const TabContainer = styled.article`
    display: inline-block;
    cursor: pointer;
`

export default memo(NewTab)