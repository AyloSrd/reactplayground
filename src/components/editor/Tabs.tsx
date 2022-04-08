import Tab from '@/components/editor/Tab'
import { memo, useCallback } from "react"

interface Props {
    tabs: string[]
}

function Tabs(props: Props) {
    const { tabs } = props
    return (
        <>
            {            
                tabs.map(tab => (
                    <Tab tab={tab}/>
                ))
            }
        </>
    )
}

export default memo(Tabs)