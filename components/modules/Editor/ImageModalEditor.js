import Image from 'next/image'
import React from 'react'

function ImageModalEditor({ imageUrl, alt , className }) {
    return (
        <Image src={imageUrl} alt={alt} width={700} height={500} className={className} />
    )
}

export default ImageModalEditor