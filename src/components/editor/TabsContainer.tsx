import AddButton from '@/components/esthetic/AddButton'
import Tab from '@/components/editor/Tab'
import TabInput from '@/components/editor/TabInput'
import { ENTRY_POINT_JSX } from '@/hooks/playground/useVFS'
import { generateNewTabName } from '@/tools/editor.tools'
import { useCreateEvento } from 'evento-react'
import { memo, useCallback, useState } from "react"
import { generalBorderStyle } from '@/tools/style-tools'
import styled from 'styled-components'

interface Props {
    currentTab: string,
    onTabCreate: (e: CustomEvent<string>) => void,
    onTabDelete: (e: CustomEvent<string>) => void,
    onTabEdit: (e: CustomEvent<{ current: string; next: string }>) => void,
    onTabSelect: (e: CustomEvent<string>) => void,
    tabs: string[]
}

function TabsContainer(props: Props) {
    const { currentTab, tabs } = props

    const [editedTab, setEditedTab] = useState<null | string>(null)
    const [newTab, setNewTab] = useState<null | string>(null)

    const evento = useCreateEvento(props)

    const handleAddClick = useCallback(() => {
        setNewTab(generateNewTabName(tabs))
    }, [])

    const handleNewTabAdd = useCallback((e: CustomEvent<{ current: string; next: string }>) => {

        evento('tabCreate', e.detail.next)
            .then(res => {
                if (res) {
                    setNewTab(null)
                }
            })
    }, [newTab])

    const handleTabDelete = useCallback((e: CustomEvent<string>) => {
        evento('tabDelete', e.detail)
    }, [])

    const handleTabEdit = useCallback((e: CustomEvent<{ current: string; next: string }>) => {
        const { current, next } = e.detail
        if (next === ENTRY_POINT_JSX) {
            setEditedTab(null)
            return
        }

        evento('tabEdit', { current, next })
            .then(res => {
                if (res) {
                    setEditedTab(null)
                }
            })
    }, [])

    const handleTabEditRequest = useCallback((e: CustomEvent<string>) => {
        setEditedTab(e.detail)
    }, [])

    const handleTabSelect = useCallback((e: CustomEvent<string>) => {
        evento('tabSelect', e.detail)
    }, [])

    return (
        <Nav>
            <Container>
                {
                    tabs.map(tab => (
                        tab === editedTab ?
                            <TabInput
                                existingTabNames={tabs}
                                key={tab}
                                onNewNameSubmit={handleTabEdit}
                                tab={tab}
                            />
                        :
                            <Tab
                                currentTab={currentTab}
                                key={tab}
                                onDelete={handleTabDelete}
                                onEditRequest={handleTabEditRequest}
                                onSelect={handleTabSelect}
                                tab={tab}
                            />
                    ))
                }
                {
                    typeof newTab === 'string' && (
                        <TabInput
                            existingTabNames={tabs}
                            onNewNameSubmit={handleNewTabAdd}
                            tab={newTab}
                        />
                    )
                }
                <AddButton onClick={handleAddClick} />
            </Container>
        </Nav>
    )
}

const Nav = styled.nav`
    width: 100%;
    max-width: 100%;
    flex-wrap: nowrap;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border-bottom: ${generalBorderStyle};

    &::-webkit-scrollbar {
        display: none;
    }
`

const Container = styled.ul`
    width: 100%;
    list-style-type: none;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
`

export default memo(TabsContainer)