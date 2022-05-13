import { transitionDuration } from '@/tools/style-tools'
import styled from 'styled-components'

interface Props {
    direction: 'down' | 'left' | 'right' | 'up',
    height: string,
    width: string,
  }

const ExpandSVG = (props: Props) => {

    const { direction, ...otherProps } = props

    return (
        <SVG
            className={direction}
            fill="currentColor"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            {...otherProps}
        >
            <path d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z" />
        </SVG>
    )
}

const SVG = styled.svg`
    transition: ${transitionDuration};
    
    &.down {
        transform: rotate(180deg)
    }

    &.left {
        transform: rotate(-90deg)
    }

    &.right {
        transform: rotate(90deg)
    }

    &.up {
        transform: rotate(0deg)
    }
`

export default ExpandSVG
