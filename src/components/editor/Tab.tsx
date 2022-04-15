import { memo, useCallback, useState } from 'react'
import styled from 'styled-components'

interface Props {
    tab: string
}

function Tab(props: Props) {
    const { tab } = props
    const [ name, type ] = tab.split('.')

    const [tempName, setTempName] = useState<string>('yo')

    const handleBlur = useCallback(() => {
        setTempName('')
        console.log('blur')
    }, [])

    const handleTabClick = useCallback(() => {
        console.log('select tab', name)
    }, [tab])

    const handleDoubleClick = useCallback(() => {
        setTempName(name)
        console.log('dBclick')
    }, [])

    const handleXCkick = useCallback(() => {
        console.log('delete', name)
    },[name])

    return (
        <TabContainer>
            <span  onClick={handleTabClick}>
                <span onDoubleClick={handleDoubleClick}>
                    {
                        tempName.length ?
                            <span>
                                <form
                                    onBlur={handleBlur}
                                >
                                    <input
                                        type="text"
                                        value={tempName}
                                    />
                                </form>
                            </span>
                        :
                            null
                    }
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