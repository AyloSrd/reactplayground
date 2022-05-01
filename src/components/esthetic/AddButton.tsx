import { colors } from '@/tools/style-tools'
import { useCreateEvento } from 'evento-react'
import React, { memo, useCallback } from 'react'
import styled from 'styled-components'

interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => any
}

const AddButton = (props: Props) => {

    const evento = useCreateEvento(props)

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        evento('click', e)
    }, [props])

    return (
        <Button onClick={handleClick}>
            +
        </Button>
    )
}

const Button = styled.button`
    background: none;
    border: none;
    color: ${colors.$silver100};
    padding: 0 10px;
    cursor: pointer;
`

export default memo(AddButton)