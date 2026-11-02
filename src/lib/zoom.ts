export interface Box {
	left: number;
	top: number;
	width: number;
	height: number;
}

export interface Size {
	width: number;
	height: number;
}

/** Space, in CSS pixels, kept between a zoomed image and the viewport's edges. */
export const ZOOM_MARGIN = 24;

/**
 * Where a zoomed image ends up: centered in the viewport, with its natural aspect ratio (so a
 * cropped image shows whole), as large as fits inside the margin. It never grows past its natural
 * size, since upscaling only shows blur, and never ends smaller than it was shown on the page.
 */
export function zoomBox(rect: Box, natural: Size, viewport: Size, margin = ZOOM_MARGIN): Box {
	const fit = Math.min((viewport.width - 2 * margin) / natural.width, (viewport.height - 2 * margin) / natural.height);
	const scale = Math.max(Math.min(fit, 1), rect.width / natural.width);
	const width = natural.width * scale;
	const height = natural.height * scale;
	return { left: (viewport.width - width) / 2, top: (viewport.height - height) / 2, width, height };
}

/**
 * The widest candidate a `srcset` offers. The browser loads only the candidate that suits the
 * displayed size, so the loaded image's natural width undersells how large the zoom can go.
 */
export function largestSrcsetWidth(srcset: string): number {
	const widths = [...srcset.matchAll(/\s(\d+)w(?:,|$)/g)].map((match) => Number(match[1]));
	return Math.max(0, ...widths);
}
