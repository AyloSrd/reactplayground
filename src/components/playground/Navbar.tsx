import ReactLogoSVG from '@/components/esthetic/icons/ReactLogoSVG'
import Button from '@/components/esthetic/Button'
import { generalBorderStyle ,colors } from '@/tools/style-tools'
import { memo } from 'react'
import styled from 'styled-components'

const Navbar = () => {
    return (
        <Nav>
            <TitleContainer>
                <ReactLogoSVG height={"40px"} width={"40px"}/>
                <Title>React Playground</Title>
            </TitleContainer>
            <Button>
                Share
            </Button>
        </Nav>
    )
}

const Nav = styled.nav`
    height: 45px; 
    width: 100vw;
    max-width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${colors.$bg};
    border-bottom: ${generalBorderStyle};
    padding: 0 10px;
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.h1`
    display: inline-block;
    margin: 0;
`

export default memo(Navbar)