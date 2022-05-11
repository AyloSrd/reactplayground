import ReactLogoSVG from '@/components/esthetic/icons/ReactLogoSVG'
import Button from '@/components/esthetic/Button'
import useURLStorage from '@/hooks/playground/useURLStorage'
import { generalBorderStyle ,colors } from '@/tools/style-tools'
import { memo, useCallback } from 'react'
import styled from 'styled-components'

const Navbar = () => {
    const { copyURLToClipBoard } = useURLStorage()

    const handleShareClick = useCallback(() => {
        copyURLToClipBoard().then(() => alert('link copied to clipboard'))
    }, [])

    return (
        <Nav>
            <TitleContainer>
                <ReactLogoSVG height={"40px"} width={"40px"}/>
                <Title>React Playground</Title>
            </TitleContainer>
            <Button onClick={handleShareClick}>
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