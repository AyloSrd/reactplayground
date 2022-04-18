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
    position: absolute;
    top: 0;
    right: 0;
`

export default memo(DeleteButton)
