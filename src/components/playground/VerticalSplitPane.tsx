import { memo, useCallback, useEffect, useReducer, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
    minWidth?: number,
    splitterWidth?: number,
    children?: React.ReactChild | React.ReactChild[], 
}

enum ActionKind {
    SETCONTAINERW = 'SETCONTAINERW',
    SETDELTA = 'SETDELTA',
    SETISMOUSEDOWN = 'SETISMOUSEDOWN',
    SETINITIALL = 'SETINITIALL',
    SETLEFTW = 'SETLEFTW',
    SETMOUSEPOS = 'SETMOUSEPOS',
    SETRIGHTW = 'SETRIGHW',
}

interface BooleanAction {
    type: ActionKind.SETISMOUSEDOWN,
    payload: boolean
}

interface NumberAction {
    type: Exclude<ActionKind, ActionKind.SETISMOUSEDOWN>,
    payload: number
}

type Action = BooleanAction | NumberAction

interface State {
	containerW: number,
	delta: number,
	isMouseDown: boolean,
	initialL: number,
	leftW: number,
    mousePos: number,
	rightW: number 
}

const initialState: State = {
	containerW: 0,
	delta: 0,
	initialL: 0,
	isMouseDown: false,
	leftW: 0,
    mousePos: 0,
	rightW: 0
}
  
function reducer(state: State, action: Action) {
    switch (action.type) {
        case ActionKind.SETCONTAINERW :
            return {
                ...state,
                containerW: action.payload
            }
        case ActionKind.SETDELTA :
            return {
                ...state,
                delta: action.payload
            }
        case ActionKind.SETINITIALL :
            return {
                ...state,
                initialL: action.payload
            }
        case ActionKind.SETISMOUSEDOWN :
            return {
                ...state,
                isMouseDown: action.payload
            }
        case ActionKind.SETLEFTW :
            return {
                ...state,
                leftW: action.payload
            }
        case ActionKind.SETMOUSEPOS :
            return {
                ...state,
                mousePos: action.payload
            }
        case ActionKind.SETRIGHTW :
            return {
                ...state,
                rightW: action.payload
            }
        default:
            throw new Error()
    }
}

function VerticalSplitPane(props: Props) {
    const { minWidth = 30, splitterWidth = 4 } = props

    const [
        {
            mousePos,
            delta,
            isMouseDown,
            containerW,
            initialL,
            leftW,
            rightW,
        }, 
        dispatch
    ] = useReducer(reducer, initialState)

    const containerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const initialContainerW = containerRef?.current?.clientWidth
        if (typeof initialContainerW === 'number') {
            const initialLeftW = (initialContainerW - splitterWidth)/2
            const initialRightW = (initialContainerW - splitterWidth)/2
            
            dispatch({ type: ActionKind.SETCONTAINERW, payload: initialContainerW})
            dispatch({ type: ActionKind.SETLEFTW, payload: initialLeftW})
            dispatch({ type: ActionKind.SETRIGHTW, payload: initialRightW})
        }
    }, [])

    return (
        <Container
            ref={containerRef}
        >
            <Pane
                style={{
                    width: `${leftW}px`
                }}
            >

            </Pane>
            <Splitter
                style={{
                    width: `${splitterWidth}px`
                }}
            />
            <Pane
                style={{
                    width: `${rightW}px`
                }}
            >

            </Pane>
        </Container>
    )
}

const Container = styled.section`
    height: 300px;
    width: 100%;
    display: flex;
    border: 1px solid black;
`

const Pane = styled.div`
    height: 100%;
`

const Splitter = styled.div`
    height: 100%;
    border-right: 1px solid black;
    cursor: col-resize;
`

export default memo(VerticalSplitPane)