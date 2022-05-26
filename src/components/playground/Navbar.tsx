import ReactPlaygroundLogoSVG from '@/components/esthetic/icons/ReactPlaygroundLogoSVG'
import ShareSVG from '@/components/esthetic/icons/ShareSVG'
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
                <ReactPlaygroundLogoSVG height={"30px"} width={"auto"}/>
                <Title>React Playground</Title>
            </TitleContainer>
            <Button onClick={handleShareClick}>
                <BtnContent>
                    <ShareSVG height={"20px"} width={"20px"}/>
                    <span>get shareable link</span>
                </BtnContent>
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
    background-color: ${colors.$bgNav};
    padding: 0 10px;
`

const BtnContent = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 5px;
    place-content: center;
    color: ${colors.$silver200};

    &:hover {
        color: ${colors.$silver100};
    }
`

const TitleContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: 10px;
`

const Title = styled.h1`
    display: inline-block;
    margin: 0;
`

export default memo(Navbar)