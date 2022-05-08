import { ENTRY_POINT_JSX } from '@/hooks/playground/useVFS'
import DeleteButton from '@/components/esthetic/DeleteButton'
import { useCreateEvento } from 'evento-react'
import { memo, useCallback } from 'react'
import styled from 'styled-components'
import { colors, makeClassName } from '@/tools/style-tools'

interface Props {
    currentTab: string,
    onDelete: (e: CustomEvent<string>) => void,
    onEditRequest: (e: CustomEvent<string>) => void,
    onSelect: (e: CustomEvent<string>) => void,
    tab: string
}

function Tab(props: Props) {
    const { currentTab, tab } = props

    const isEntryPoint = tab === ENTRY_POINT_JSX
    const tabClassNames = [
        ...(isEntryPoint ? ['is-entry-point'] : []),
        ...(tab === currentTab ? ['is-selected'] : []),
    ]

    const evento = useCreateEvento(props)

    const handleTabClick = useCallback(() => {
        evento('select', tab)
    }, [tab])

    const handleDoubleClick = useCallback(() => {
        if (isEntryPoint) {
            return
        }
        evento('editRequest', tab)
    }, [])

    const handleDeleteCkick = useCallback(() => {
        if (isEntryPoint) {
            return
        }
        evento('delete', tab)
    }, [tab])

    return (
        <TabContainer className={makeClassName(tabClassNames)}>
            <Pointer  onClick={handleTabClick}>
                <span onDoubleClick={handleDoubleClick}>
                    {tab}
                </span>
            </Pointer>
            {!isEntryPoint && <DeleteButton onClick={handleDeleteCkick} />}
        </TabContainer>
    )
}

export const TabContainer = styled.li`
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    height: 100%;
    position: relative;
    padding: 5px 30px 5px 0;
    margin: 0 0 0 10px;

    &.is-entry-point {
        padding-right: 0;
    }

    &.is-selected {
        box-shadow: inset 0px -2px 0px 0px ${colors.$react};
    }
`

const Pointer = styled.span`
    cursor: pointer;
`

export default memo(Tab)