import AddSVG from '@/components/esthetic//icons/AddSVG'
import Button from '@/components/esthetic/Button'
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
        <StyledButton onClick={handleClick}>
            <AddSVG height={"20px"} width={"20px"} />
        </StyledButton>
    )
}

const StyledButton = styled(Button)`
    color: ${colors.$silver300};

    &:hover {
        color: ${colors.$silver200};
    }
`

export default memo(AddButton)
