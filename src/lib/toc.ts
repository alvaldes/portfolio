import type { MarkdownHeading } from "astro";

/** A post needs at least this many sections (## headings) to get an index; a shorter one reads fine without it. */
export const MIN_TOC_SECTIONS = 3;

/** The sections a post's index lists, or none when the post is too short to need one. */
export function tocSections(headings: MarkdownHeading[]): MarkdownHeading[] {
	const sections = headings.filter((heading) => heading.depth === 2);
	return sections.length >= MIN_TOC_SECTIONS ? sections : [];
}

/** The section being read: the last heading whose top has reached the threshold, none above the first one. */
export function activeHeadingId(headings: { id: string; top: number }[], threshold: number): string | undefined {
	let current: string | undefined;
	for (const heading of headings) {
		if (heading.top <= threshold) current = heading.id;
	}
	return current;
}
