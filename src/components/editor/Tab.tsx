import { ENTRY_POINT_JSX } from '@/hooks/playground/useVFS'
import JavaScripLogoSVG from '@/components/esthetic/icons/JavaScripLogoSVG'
import ReactLogoSVG from '@/components/esthetic/icons/ReactLogoSVG'
import DeleteButton from '@/components/esthetic/DeleteButton'
import { useCreateEvento } from 'evento-react'
import { memo, useCallback } from 'react'
import styled from 'styled-components'
import { colors, languageToColor, makeClassName } from '@/tools/style-tools'

interface Props {
    currentTab: string,
    onDelete: (e: CustomEvent<string>) => void,
    onEditRequest: (e: CustomEvent<string>) => void,
    onSelect: (e: CustomEvent<string>) => void,
    tab: string
}

function Tab(props: Props) {
    const { currentTab, tab } = props

    const fileFormat = tab.split('.')[1]
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
        <TabContainer
            className={makeClassName(tabClassNames)}
            underliningColor={languageToColor[fileFormat]}
        >
            <Pointer  onClick={handleTabClick}>
                <span>
                    {
                        fileFormat === 'js' ?
                            <StyledJavaScriptLogoSVG height="12px" width='12px' />
                        : fileFormat === 'jsx' ?
                            <ReactLogoSVG height="22px" width='25px' />
                        :
                            null
                    }
                </span>
                <span onDoubleClick={handleDoubleClick}>
                    {tab}
                </span>
            </Pointer>
            {!isEntryPoint && <DeleteButton onClick={handleDeleteCkick} />}
        </TabContainer>
    )
}

export const TabContainer = styled.li<{ underliningColor: string }>`
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    height: 100%;
    position: relative;
    padding: 5px 30px 5px 0;
    margin: 0 0 0 10px;
    color: ${colors.$silver200};

    &.is-entry-point {
        padding-right: 0;
        margin-right: 5px;
    }

    &.is-selected {
        box-shadow: inset 0px -2px 0px 0px ${props => props.underliningColor};
        color: ${colors.$silver100};
    }
`

const StyledJavaScriptLogoSVG = styled(JavaScripLogoSVG)`
    margin-right: 5px;
`

const Pointer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
`

export default memo(Tab)