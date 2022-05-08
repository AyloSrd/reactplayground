import { colors } from '@/tools/style-tools'
import { memo } from 'react'
import styled from 'styled-components'

const Button = styled.button`
    background: none;
    border: none;
    color: ${colors.$silver100};
    height: 30px;
    width: 30px;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export default memo(Button)