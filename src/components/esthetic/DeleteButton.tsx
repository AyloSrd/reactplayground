import Button from '@/components/esthetic/Button'
import CloseSVG from '@/components/esthetic/icons/CloseSVG'
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
        <StyledButton onClick={handleClick}>
            <CloseSVG height={"15px"} width={"15px"} />
        </StyledButton>
    )
}

const StyledButton = styled(Button)`
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    color: ${colors.$silver300};

    &:hover {
        color: ${colors.$red};
    }
`

export default memo(DeleteButton)
