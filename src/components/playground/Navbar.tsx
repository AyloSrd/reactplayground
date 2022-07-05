import ReactPlaygroundLogoSVG from '@/components/esthetic/icons/ReactPlaygroundLogoSVG'
import Anchor from '@/components/esthetic/Anchor'
import BugSVG from '@/components/esthetic/icons/BugSVG'
import ShareSVG from '@/components/esthetic/icons/ShareSVG'
import Button from '@/components/esthetic/Button'
import CodeSandboxLogoSVG from '@/components/esthetic/icons/CodeSanboxLogoSVG'
import useURLStorage from '@/hooks/playground/useURLStorage'
import { colors } from '@/tools/style-tools'
import { memo, useCallback } from 'react'
import styled from 'styled-components'
import { useCreateEvento } from 'evento-react'

interface Props {
    onExportToCodeSandbox: () => void,
    onReloadPlayground: () => void,
}

const Navbar = (props: Props) => {
    const evento = useCreateEvento(props)
    const { copyURLToClipBoard } = useURLStorage()

    const handleExportToCodeSandboxClick = useCallback(() => {
        evento('exportToCodeSandbox')
    }, [props])

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
            <ButtonContainer>
                <div title="Export to CodeSandbox">
                    <Button onClick={handleExportToCodeSandboxClick}>
                        <BtnContent>
                            <CodeSandboxLogoSVG height={"20px"} width={"20px"}/>
                        </BtnContent>
                    </Button>
                </div>
                <div title="Get shareable link">
                    <Button onClick={handleShareClick}>
                        <BtnContent>
                            <ShareSVG height={"25px"} width={"25px"}/>
                        </BtnContent>
                    </Button>
                </div>
                <div title="Report bug or issue">
                    <Button>
                        <Anchor>
                            <BtnContent>
                                <BugSVG height={"30px"} width={"30px"}/>
                            </BtnContent>
                        </Anchor>
                    </Button>
                </div>
            </ButtonContainer>
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

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-right: 20px;
`

const BtnContent = styled.div`
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