import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

function Loader({ width, height, color }) {
    return (
        <ThreeDots
            height={height}
            width={width}
            radius="9"
            color={color}
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    )
}

export default Loader