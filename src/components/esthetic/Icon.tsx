import { iconMapping } from '@/tools/icon-tools'
import React, { memo, useCallback } from 'react'

interface Props {
    shape: string
}

const Icon = (props: Props) => {
    const svgSrc = iconMapping[props.shape]

    return (
        <img src={svgSrc} />
    )

}

export default memo(Icon)