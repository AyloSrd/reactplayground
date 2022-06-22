import ReactPlaygroundLogoSVG from '@/components/esthetic/icons/ReactPlaygroundLogoSVG'
import ShareSVG from '@/components/esthetic/icons/ShareSVG'
import Button from '@/components/esthetic/Button'
import useURLStorage from '@/hooks/playground/useURLStorage'
import { colors } from '@/tools/style-tools'
import { memo, useCallback } from 'react'
import styled from 'styled-components'
import { useCreateEvento } from 'evento-react'

interface Props {
    onReloadPlayground: () => void,
}

const Navbar = (props: Props) => {
    const evento = useCreateEvento(props)
    const { copyURLToClipBoard } = useURLStorage()

    const handleReloadClick = useCallback(() => {
        evento('reloadPlayground')
    }, [])

    const handleShareClick = useCallback(() => {
        copyURLToClipBoard().then(() => alert('link copied to clipboard'))
    }, [])

    return (
        <Nav>
            <TitleContainer onClick={handleReloadClick}>
                <ReactPlaygroundLogoSVG height={"30px"} width={"100%"}/>
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
    cursor: pointer;
`

const Title = styled.h1`
    display: inline-block;
    margin: 0;
`

export default memo(Navbar)