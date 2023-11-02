import AddButton from '@/components/ui-elements/AddButton'
import Tab from '@/components/editor/Tab'
import TabInput from '@/components/editor/TabInput'
import { ENTRY_POINT_JSX } from '@/hooks/playground/useVFS'
import { generateNewTabName } from '@/tools/editor.tools'
import { useCreateEvento } from 'evento-react'
import { memo, useCallback, useState } from "react"
import { generalBorderStyle } from '@/tools/style-tools'
import styled from 'styled-components'
import Worker from "@/workers/prettify.worker?worker";
interface Props {
    currentTab: string,
    onTabCreate: (e: CustomEvent<string>) => void,
    onTabDelete: (e: CustomEvent<string>) => void,
    onTabEdit: (e: CustomEvent<{ current: string; next: string }>) => void,
    onTabSelect: (e: CustomEvent<string>) => void,
    tabs: string[]
}

const prettierWorker = new Worker()
prettierWorker.postMessage({
    content: 'your code to format',
    fileType: 'js', // or 'ts', 'jsx', 'tsx', 'html', 'css'
  });

  prettierWorker.onmessage = (e) => {
    const formattedContent = e.data;
    console.log('yo', formattedContent);
  };
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

    return (<Container>
        <Nav>
            <Tabs>
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
            </Tabs>
        </Nav>
        <AddButton onClick={() => console.log('add button clicked')} />
    </Container>)
}

const Nav = styled.nav`
    width: 100%;
    max-width: 100%;
    flex-wrap: nowrap;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
        display: none;
    }
    `

const Tabs = styled.ul`
    width: 100%;
    list-style-type: none;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    `

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: ${generalBorderStyle};
`

export default memo(TabsContainer)