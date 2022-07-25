import ThreeVerticalDotsSVG from '@/components/esthetic/icons/ThreeVerticalDotsSVG'
import usePreviousValue from '@/hooks/playground/usePreviosValue'
import useWindowSize from '@/hooks/playground/useWindowSize'
import { colors, generalBorderStyle } from '@/tools/style-tools'
import React, { memo, useEffect, useReducer, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
    leftPaneChild?: React.ReactChild,
    minWidth?: number,
    rightPaneChild?: React.ReactChild,
    splitterWidth?: number,
}

enum ActionKind {
    SET_CONTAINER_W = 'SET_CONTAINER_W',
    SET_IS_MOUSE_DOWN = 'SET_IS_MOUSE_DOWN',
    SET_INITIAL_L = 'SET_INITIAL_L',
    SET_LEFT_W = 'SET_LEFT_W',
    SET_MOUSE_POS = 'SET_MOUSE_POS',
    SET_RIGHT_W = 'SET_RIGHT_W',
}

interface BooleanAction {
    type: ActionKind.SET_IS_MOUSE_DOWN,
    payload: boolean
}

interface NumberAction {
    type: Exclude<ActionKind, ActionKind.SET_IS_MOUSE_DOWN>,
    payload: number
}

type Action = BooleanAction | NumberAction

interface State {
	containerW: number,
	isMouseDown: boolean,
	initialL: number,
	leftW: number,
    mousePos: number,
	rightW: number
}

const initialState: State = {
	containerW: 0,
	initialL: 0,
	isMouseDown: false,
	leftW: 0,
    mousePos: 0,
	rightW: 0
}

function reducer(state: State, action: Action) {
    switch (action.type) {
        case ActionKind.SET_CONTAINER_W :
            return {
                ...state,
                containerW: action.payload
            }
        case ActionKind.SET_INITIAL_L :
            return {
                ...state,
                initialL: action.payload
            }
        case ActionKind.SET_IS_MOUSE_DOWN :
            return {
                ...state,
                isMouseDown: action.payload
            }
        case ActionKind.SET_LEFT_W :
            return {
                ...state,
                leftW: action.payload
            }
        case ActionKind.SET_MOUSE_POS :
            return {
                ...state,
                mousePos: action.payload
            }
        case ActionKind.SET_RIGHT_W :
            return {
                ...state,
                rightW: action.payload
            }
        default:
            throw new Error()
    }
}

function VerticalSplitPane(props: Props) {
    const { leftPaneChild = null, minWidth = 200, splitterWidth = 10, rightPaneChild = null } = props

    const [
        {
            mousePos,
            isMouseDown,
            containerW,
            initialL,
            leftW,
            rightW,
        },
        dispatch
    ] = useReducer(reducer, initialState)

    const containerRef = useRef<HTMLElement>(null)

    const { width: windowW } = useWindowSize()

    const prevWindowW = usePreviousValue<number | undefined>(windowW)
    const handleMouseDown = (e: React.PointerEvent<HTMLDivElement>) => {
        dispatch({
            type: ActionKind.SET_MOUSE_POS,
            payload: e.clientX,
        })

        dispatch({
            type: ActionKind.SET_INITIAL_L,
            payload: leftW,
        })

        dispatch({
            type: ActionKind.SET_IS_MOUSE_DOWN,
            payload: true,
        })

        function handleMouseMove(e: MouseEvent) {
            const delta = mousePos - e.clientX
			const updatedLeftW =
				initialL - delta <= minWidth ?
					minWidth
				: initialL - delta >= containerW - splitterWidth - minWidth ?
					containerW - splitterWidth - minWidth
				:
					initialL - delta

			const updatedRightW = containerW - updatedLeftW - splitterWidth

            dispatch({
                type: ActionKind.SET_LEFT_W,
                payload: updatedLeftW,
            })

            dispatch({
                type: ActionKind.SET_RIGHT_W,
                payload: updatedRightW,
            })
        }

        function handleMouseUp() {
            dispatch({
                type: ActionKind.SET_IS_MOUSE_DOWN,
                payload: false,
            })
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    useEffect(() => {
        const initialContainerW = containerRef?.current?.clientWidth

        if (typeof initialContainerW === 'number') {
            const initialLeftW = (initialContainerW - splitterWidth)/2
            const initialRightW = (initialContainerW - splitterWidth)/2

            dispatch({
                type: ActionKind.SET_CONTAINER_W,
                payload: initialContainerW
            })
            dispatch({
                type: ActionKind.SET_LEFT_W,
                payload: initialLeftW < minWidth ? minWidth : initialLeftW
            })
            dispatch({
                type: ActionKind.SET_RIGHT_W,
                payload: initialRightW < minWidth ? minWidth : initialRightW
            })
        }
    }, [])

    useEffect(() => {
        const currContainerW = containerRef?.current?.clientWidth

        if (
            typeof windowW !== 'number'
            || typeof prevWindowW !== 'number'
            || typeof currContainerW !== 'number'
            || windowW === prevWindowW
        ) {
            return
        }

        const leftRatio = leftW / (leftW + rightW - splitterWidth/2)
        const tempLevtW = currContainerW * leftRatio - splitterWidth/2

        dispatch({
            type: ActionKind.SET_CONTAINER_W,
            payload: currContainerW
        })

        dispatch({
            type: ActionKind.SET_LEFT_W,
            payload: tempLevtW
        })

        dispatch({
            type: ActionKind.SET_RIGHT_W,
            payload: currContainerW - tempLevtW - splitterWidth/2
        })

	}, [containerW, prevWindowW, leftW, rightW, windowW])

    return (
        <Container
            className={isMouseDown ? 'disableSelect' : ''}
            ref={containerRef}
        >
            <Pane
                style={{ width: `${leftW}px` }}
            >
                { isMouseDown && <WindowHook />}
                { leftPaneChild }
            </Pane>
            <Splitter
                className={isMouseDown ? "in-use" : ""}
                onMouseDown={handleMouseDown}
                style={{ width: `${splitterWidth}px` }}
            >
                <ThreeVerticalDotsSVG height={"30px"} width={"50px"} />
            </Splitter>
            <Pane
                style={{ width: `${rightW}px` }}
            >
                { isMouseDown && <WindowHook />}
                { rightPaneChild }
            </Pane>
        </Container>
    )
}

const Container = styled.section`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;

    &.diableSelect, &.disableSelect * {
        user-select: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		cursor: col-resize;
    }
`

const Pane = styled.div`
    height: 100%;
`

const Splitter = styled.div`
    height: 100%;
    display: grid;
    place-content: center;
    background-color: ${colors.$bg};
    cursor: col-resize;
    color: ${colors.$silver200};
    border-left: ${generalBorderStyle};
    border-right: ${generalBorderStyle};

    &:hover, &.in-use {
        background-color: ${colors.$purple};
    }
`

const WindowHook = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
`

export default memo(VerticalSplitPane)