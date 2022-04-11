import React, { memo, useCallback, useEffect, useReducer, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
    leftPaneChild?: React.ReactChild,
    minWidth?: number,
    rightPaneChild?: React.ReactChild,
    splitterWidth?: number,
}

enum ActionKind {
    SETCONTAINERW = 'SETCONTAINERW',
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
        case ActionKind.SETCONTAINERW :
            return {
                ...state,
                containerW: action.payload
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
    const { leftPaneChild = null, minWidth = 30, splitterWidth = 4, rightPaneChild = null } = props

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

    const handleMouseDown = (e: React.PointerEvent<HTMLDivElement>) => {
        dispatch({
            type: ActionKind.SETMOUSEPOS,
            payload: e.clientX,
        })

        dispatch({
            type: ActionKind.SETINITIALL,
            payload: leftW,
        })

        dispatch({
            type: ActionKind.SETISMOUSEDOWN,
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
                type: ActionKind.SETLEFTW,
                payload: updatedLeftW,
            })

            dispatch({
                type: ActionKind.SETRIGHTW,
                payload: updatedRightW,
            })
        }

        function handleMouseUp() {
            dispatch({
                type: ActionKind.SETISMOUSEDOWN,
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
                type: ActionKind.SETCONTAINERW,
                payload: initialContainerW
            })
            dispatch({
                type: ActionKind.SETLEFTW,
                payload: initialLeftW < minWidth ? minWidth : initialLeftW
            })
            dispatch({
                type: ActionKind.SETRIGHTW,
                payload: initialRightW < minWidth ? minWidth : initialRightW
            })
        }
    }, [])

    return (
        <Container
            className={isMouseDown ? 'disableSelect' : ''}
            ref={containerRef}
        >
            <Pane
                style={{ width: `${leftW}px` }}
            >
                { leftPaneChild }
            </Pane>
            <Splitter
                onMouseDown={handleMouseDown}
                style={{ width: `${splitterWidth}px` }}
            />
            <Pane
                style={{ width: `${rightW}px` }}
            >
                { rightPaneChild }
            </Pane>
        </Container>
    )
}

const Container = styled.section`
    height: 100%;
    width: 100%;
    display: flex;
    border: 1px solid black;

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
    border-right: 1px solid black;
    cursor: col-resize;
`

export default memo(VerticalSplitPane)