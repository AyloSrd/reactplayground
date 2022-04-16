import Tab from '@/components/editor/Tab'
import { memo, useCallback } from "react"

interface Props {
    tabs: string[]
}

function TabsContainer(props: Props) {
    const { tabs } = props
    return (
        <>
            {            
                tabs.map(tab => (
                    <Tab 
                        key={tab}
                        onDelete={console.log}
                        onEdit={console.log}
                        onSelect={console.log}
                        tab={tab}
                    />
                ))
            }
        </>
    )
}

export default memo(TabsContainer)