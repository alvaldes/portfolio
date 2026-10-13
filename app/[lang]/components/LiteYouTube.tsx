'use client'

import { useEffect } from 'react'

interface LiteYouTubeProps {
    videoId: string
    title: string
    playLabel: string
}

/**
 * Client-side wrapper around the `<lite-youtube>` web component. The element
 * definition is imported on the client only: a static import would run
 * `customElements.define` while the server renders the first HTML, and the
 * dynamic import is what keeps the video click-to-load instead of an eager
 * iframe.
 */
export default function LiteYouTube({
    videoId,
    title,
    playLabel
}: LiteYouTubeProps) {
    useEffect(() => {
        import('@justinribeiro/lite-youtube')
    }, [])

    return (
        <lite-youtube
            videoid={videoId}
            videotitle={title}
            videoplay={playLabel}
            className='block w-full'
        />
    )
}
