import { colors } from '@/tools/style-tools'
import React, { memo, useCallback, useState } from 'react'
import styled from 'styled-components'
import ExpandSVG from './icons/ExpandSVG'

interface Props {
    leftPaneChild?: React.ReactChild,
    rightPaneChild?: React.ReactChild,
}

enum Tabs {
    LEFT = 'Editor',
    RIGHT = 'Result',
}

function MobileTabDisplayer(props: Props) {
    const { leftPaneChild = null, rightPaneChild = null } = props

    const [currTab, setCurrtab] = useState<Tabs>(Tabs.LEFT)

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrtab(e.target.checked ? Tabs.LEFT : Tabs.RIGHT)
    }, [])

    const showEditor = currTab === Tabs.LEFT

    return (
        <Container>
            <Pane>
                {showEditor ? leftPaneChild : rightPaneChild}
            </Pane>
            <SwithcSection>
                <Label htmlFor="tab-switcher">
                    {
                        showEditor ?
                            <>
                                <ExpandSVG
                                    direction={"left"}
                                    height={"20px"}
                                    width={"20px"}
                                />
                                {Tabs.RIGHT}
                            </>
                        :
                            <>
                                {Tabs.LEFT}
                                <ExpandSVG
                                    direction={"right"}
                                    height={"20px"}
                                    width={"20px"}
                                />
                            </>
                    }
                    <TabCheckbox
                        checked={currTab === Tabs.LEFT}
                        onChange={handleChange}
                        id="tab-switcher"
                        type="checkbox"
                    />
                </Label>
            </SwithcSection>
        </Container>
    )
}

const Container = styled.section`
    position: relative;
    height: 100%;
    width: 100%;
`

const Pane = styled.div`
    height: calc(100% - 35px);
    width: 100%;
`

const SwithcSection = styled.form`
    height: 35px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.$purple};
    color: ${colors.$silver100};
`

const Label = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
`

const TabCheckbox = styled.input`
    display: none;
`

export default memo(MobileTabDisplayer)