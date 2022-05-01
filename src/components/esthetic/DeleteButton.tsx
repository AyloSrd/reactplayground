import { colors } from '@/tools/style-tools'
import { useCreateEvento } from 'evento-react'
import React, { memo, useCallback } from 'react'
import styled from 'styled-components'

interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => any
}

const DeleteButton = (props: Props) => {

    const evento = useCreateEvento(props)

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        evento('click', e)
    }, [props])

    return (
        <Button onClick={handleClick}>
            x
        </Button>
    )
}

const Button = styled.button`
    background: none;
    border: none;
    color: ${colors.$red};
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    cursor: pointer;
`

export default memo(DeleteButton)
