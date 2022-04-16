import Tab from '@/components/editor/Tab'
import { useCreateEvento } from 'evento-react'
import { memo, useCallback } from "react"

interface Props {
    currentTab: string,
    onTabCreate: () => void,
    onTabDelete: (e: CustomEvent<string>) => void,
    onTabEdit: (e: CustomEvent<{ current: string; next: string }>) => void,
    onTabSelect: (e: CustomEvent<string>) => void,
    tabs: string[]
}

function TabsContainer(props: Props) {
    const { currentTab, tabs } = props

    const evento = useCreateEvento(props)

    const handleTabDelete = useCallback((e: CustomEvent<string>) => {
        evento('tabDelete', e.detail)
    }, [])

    const handleTabEdit = useCallback((e: CustomEvent<{ current: string; next: string }>) => {
        evento('tabEdit', e.detail)
    }, [])


    const handleTabSelect = useCallback((e: CustomEvent<string>) => {
        evento('tabSelect', e.detail)
    }, [])

    const handleAddClick = useCallback(() => {
        evento('tabCreate')
    }, [])

    return (
        <>
            {
                tabs.map(tab => (
                    <Tab
                        currentTab={currentTab}
                        key={tab}
                        onDelete={handleTabDelete}
                        onEdit={handleTabEdit}
                        onSelect={handleTabSelect}
                        tab={tab}
                    />
                ))
            }
            <button>
                +
            </button>
        </>
    )
}

export default memo(TabsContainer)