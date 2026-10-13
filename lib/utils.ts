import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Reads the 11-character video id out of the YouTube URLs the dictionaries
 * store: watch links, short links, embeds, shorts and live links. Only a
 * YouTube host carrying a well-formed id resolves, so an unrelated link or a
 * mistyped id renders no player instead of a wrong one.
 */
export function youTubeVideoId(url: string): string | null {
    let parsed: URL
    try {
        parsed = new URL(url)
    } catch {
        return null
    }

    const host = parsed.hostname.replace(/^(?:www|m|music)\./, '')
    const [first, second] = parsed.pathname.split('/').filter(Boolean)

    let candidate: string | null = null
    if (host === 'youtu.be') {
        candidate = first ?? null
    } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
        if (first === 'watch') {
            candidate = parsed.searchParams.get('v')
        } else if (['embed', 'shorts', 'live'].includes(first)) {
            candidate = second ?? null
        }
    }

    // `/embed/videoseries?list=…` is a playlist, not a video, and `videoseries`
    // is eleven id-shaped characters, so without this it would be handed back
    // as the id of a video that does not exist.
    if (candidate === 'videoseries') {
        return null
    }

    return candidate && /^[A-Za-z0-9_-]{11}$/.test(candidate) ? candidate : null
}
