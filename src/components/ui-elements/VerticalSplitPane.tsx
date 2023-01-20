import { responsiveBreakpoint } from '@/tools/style-tools'
import useWindowSize from '@/hooks/playground/useWindowSize'
import React, { memo } from 'react'
import MobileVerticalSplitPane from '@/components/ui-elements/MobileVerticalSplitPane'
import DesktopVerticalSplitPane from '@/components/ui-elements/DesktopVerticalSplitPane'

interface Props {
    leftPaneChild?: React.ReactChild,
    minWidth?: number,
    rightPaneChild?: React.ReactChild,
    splitterWidth?: number,
}

function PanesResponsivityHandler(props: Props) {
    const { leftPaneChild, rightPaneChild } = props

    const { width: windowW } = useWindowSize()

    return (
        typeof windowW === 'number'
        && windowW > responsiveBreakpoint ?
            <DesktopVerticalSplitPane {...props} />
        :
            <MobileVerticalSplitPane
                leftPaneChild={leftPaneChild}
                rightPaneChild={rightPaneChild}
            />
    )
}

export default memo(PanesResponsivityHandler)