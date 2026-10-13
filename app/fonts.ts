import localFont from 'next/font/local'

/**
 * The latin subset of both families, self-hosted. `next/font/google` used to
 * fetch these from Google's CDN during every build, which made the build
 * depend on the network; these are the exact files that request returned
 * (`subsets: ['latin']` is one file per weight), so the glyphs are the same.
 * OFL-*.txt carries each family's license.
 *
 * The subset's `unicode-range` is deliberately not restated: Next's font
 * loader only accepts inline literals there, and letting the family cover
 * every codepoint falls back per glyph exactly like the narrowed range did.
 */
export const mPlus = localFont({
    src: [
        {
            path: './fonts/m-plus-rounded-1c-latin-400.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: './fonts/m-plus-rounded-1c-latin-500.woff2',
            weight: '500',
            style: 'normal'
        },
        {
            path: './fonts/m-plus-rounded-1c-latin-700.woff2',
            weight: '700',
            style: 'normal'
        }
    ],
    variable: '--font-m-plus'
})

export const comfortaa = localFont({
    src: [
        {
            path: './fonts/comfortaa-latin-700.woff2',
            weight: '700',
            style: 'normal'
        }
    ],
    variable: '--font-comfortaa'
})
