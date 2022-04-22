import Tab from '@/components/editor/Tab'
import TabInput from '@/components/editor/TabInput'
import { ENTRY_POINT_JSX } from '@/hooks/playground/useEsbuild'
import { generateNewTabName } from '@/tools/editor.tools'
import { useCreateEvento } from 'evento-react'
import { memo, useCallback, useState } from "react"

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

    const handleNewTabDelete = useCallback(() => {
        setNewTab(null)
    }, [])

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
        <>
            {
                tabs.map(tab => (
                    tab === editedTab ?
                        <TabInput
                            key={tab}
                            onNewNameSubmit={handleTabEdit}
                            onDelete={handleTabDelete}
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
                        onNewNameSubmit={handleNewTabAdd}
                        onDelete={handleNewTabDelete}
                        tab={newTab}
                    />
                )
            }
            <button onClick={handleAddClick}>
                +
            </button>
        </>
    )
}

export default memo(TabsContainer)