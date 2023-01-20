import Loader from '@/components/ui-elements/Loader'
import styled from 'styled-components'


export default function EditorFallback() {
    return (
        <Container>
            <Loader />
        </Container>
    )
}

const Container = styled.section`
    height: 100%;
    max-height: 100%;
    flex-grow: 1;
    display: grid;
    place-content: center;
`
