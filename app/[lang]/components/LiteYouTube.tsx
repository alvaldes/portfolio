'use client'

import { useEffect } from 'react'

interface LiteYouTubeProps {
    videoId: string
    title: string
    playLabel: string
    poster?: string
}

/**
 * Client-side wrapper around the `<lite-youtube>` web component. The element
 * definition is imported on the client only: a static import would run
 * `customElements.define` while the server renders the first HTML, and the
 * dynamic import is what keeps the video click-to-load instead of an eager
 * iframe.
 *
 * `poster` fills the component's `image` slot. The component only falls back to
 * YouTube's own thumbnail when that slot is empty, so passing a poster also
 * drops the request to i.ytimg.com. It has to be 16:9 to match the player: the
 * YouTube thumbnail it replaces is 480x360, which is what made the placeholder
 * look pixelated.
 */
export default function LiteYouTube({
    videoId,
    title,
    playLabel,
    poster
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
        >
            {poster && <img slot='image' src={poster} alt='' />}
        </lite-youtube>
    )
}
