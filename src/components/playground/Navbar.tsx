import { memo } from 'react'
import styled from 'styled-components'

const Navbar = () => {
    return (
        <Nav />
    )
}

const Nav = styled.nav`
    display: flex;
`

export default memo(Navbar)