import { memo, useCallback, useState } from 'react'
import styled from 'styled-components'

interface Props {
    tab: string
}

function Tab(props: Props) {
    const { tab } = props
    const [ name, type ] = tab.split('.')

    const [tempName, setTempName] = useState('')

    const handleTabClick = useCallback(() => {
        console.log('select tab', name)
    }, [tab])

    const handleDoubleClick = useCallback(() => {
        console.log('dBclick')
    }, [])

    const handleXCkick = useCallback(() => {
        console.log('delete', name)
    },[name])

    return (
        <TabContainer>
            <span  onClick={handleTabClick}>
                <span onDoubleClick={handleDoubleClick}>
                    <span>
                        <form>
                            <input 
                                type="text"
                            />
                        </form>
                    </span>
                    <span>
                        {name}
                    </span>
                    <span>
                        .{type}
                    </span>
                </span>
            </span>
            <span onClick={handleXCkick}>
                x
            </span>
        </TabContainer>
    )
}

const TabContainer = styled.article`
    display: inline-block;
    cursor: pointer;
`

export default memo(Tab)