import { ENTRY_POINT_JSX } from '@/hooks/playground/useEsbuild'
import DeleteButton from '@/components/esthetic/DeleteButton'
import { useCreateEvento } from 'evento-react'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
    currentTab: string,
    onDelete: (e: CustomEvent<string>) => void,
    onEditRequest: (e: CustomEvent<string>) => void,
    onSelect: (e: CustomEvent<string>) => void,
    tab: string
}

function Tab(props: Props) {
    const { tab } = props

    const isEntryPoint = tab === ENTRY_POINT_JSX

    const evento = useCreateEvento(props)

    const handleTabClick = useCallback(() => {
        evento('select', tab)
    }, [tab])

    const handleDoubleClick = useCallback(() => {
        if (isEntryPoint) {
            return
        }
        evento('editRequest', tab)
    }, [])

    const handleDeleteCkick = useCallback(() => {
        if (isEntryPoint) {
            return
        }
        evento('delete', tab)
    }, [tab])

    return (
        <span>
            <span  onClick={handleTabClick}>
                <span onDoubleClick={handleDoubleClick}>
                    {tab}
                </span>
            </span>
            <DeleteButton onClick={handleDeleteCkick} />
        </span>
    )
}

export default memo(Tab)