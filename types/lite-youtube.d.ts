import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { LiteYTEmbed } from '@justinribeiro/lite-youtube'

/**
 * `@justinribeiro/lite-youtube` ships its element and extends
 * `HTMLElementTagNameMap`, but it does not teach TypeScript the JSX tag. React
 * 19 keeps the JSX namespace inside `react`, so the tag is declared here.
 */
declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'lite-youtube': DetailedHTMLProps<
                HTMLAttributes<LiteYTEmbed>,
                LiteYTEmbed
            > & {
                videoid?: string
                videotitle?: string
                videoplay?: string
            }
        }
    }
}
