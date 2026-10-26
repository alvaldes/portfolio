import { getCollection, type CollectionEntry } from "astro:content";
import { LANGUAGES, type UiType } from "../i18n/utils";

export type Post = CollectionEntry<"blog"> & {
	// The folder name, shared by every language: /blog/<slug>.
	slug: string;
	readingMinutes: number;
};

const WORDS_PER_MINUTE = 200;

function readingMinutes(body = ""): number {
	const words = body.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Fails the build when a post is missing a language, or its languages disagree
 * on the date or the draft flag, so a post never ships in only one language.
 */
function assertPostsMatchAcrossLanguages(entries: CollectionEntry<"blog">[]): void {
	const bySlug = Map.groupBy(entries, (entry) => entry.id.split("/")[0] as string);

	for (const [slug, versions] of bySlug) {
		for (const lang of Object.keys(LANGUAGES)) {
			if (!versions.some((entry) => entry.id === `${slug}/${lang}`)) {
				throw new Error(`Post "${slug}" has no "${lang}" version: add src/content/blog/${slug}/${lang}.md.`);
			}
		}

		const [first, ...rest] = versions as [CollectionEntry<"blog">, ...CollectionEntry<"blog">[]];
		for (const other of rest) {
			for (const field of ["pubDate", "updatedDate", "draft"] as const) {
				if (String(first.data[field]) !== String(other.data[field])) {
					throw new Error(
						`Post "${slug}" has a different "${field}" in "${first.id}.md" and "${other.id}.md": keep it the same in every language.`,
					);
				}
			}
		}
	}
}

/** The posts in the given language, newest first. Drafts are left out of production builds. */
export async function getPosts(lang: UiType): Promise<Post[]> {
	const entries = await getCollection("blog");
	assertPostsMatchAcrossLanguages(entries);

	return entries
		.filter((entry) => entry.id.endsWith(`/${lang}`))
		.filter((entry) => !(import.meta.env.PROD && entry.data.draft))
		.map((entry) => ({
			...entry,
			slug: entry.id.split("/")[0] as string,
			readingMinutes: readingMinutes(entry.body),
		}))
		.toSorted((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

// Dates come from the frontmatter at midnight UTC, so format them in UTC too.
export function formatPostDate(date: Date, lang: UiType): string {
	return new Intl.DateTimeFormat(lang, { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}
