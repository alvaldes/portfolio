import type { ImageMetadata } from "astro";
import { getDictionary, LANGUAGES, type UiType } from "../i18n/utils";

// Project thumbnails live in src/assets so <Image> can resize them at build time.
const PROJECT_IMAGES = import.meta.glob<{ default: ImageMetadata }>("/src/assets/projects/**/*.webp", {
	eager: true,
});

/**
 * Maps a dictionary path such as "/images/storico/thumbCard.webp" to its
 * imported asset. Fails the build when the file is missing, instead of
 * shipping a broken image.
 */
export function getProjectImage(dictionaryPath: string): ImageMetadata {
	const key = dictionaryPath.replace(/^\/images\//, "/src/assets/projects/");
	const image = PROJECT_IMAGES[key];
	if (!image) {
		throw new Error(`Project image not found: ${dictionaryPath} (expected ${key})`);
	}
	return image.default;
}

export interface Project {
	id: string;
	title: string;
	year: string;
	tag?: string;
	stack: string;
	shortDescription: string;
	longDescription: string;
	website?: string;
	sourceCode?: string;
	video?: string;
	channel?: string;
	videoPoster?: string;
	platform: string;
	active: number;
	thumbCard: string;
	thumbFirst: string;
	thumbMockup: string;
}

// The only fields that are written per language; every other field is shared data.
const TRANSLATED_FIELDS = new Set<string>(["shortDescription", "longDescription"]);

let localesChecked = false;

/**
 * Fails the build when the locales disagree on the projects: same ids in the
 * same order, and identical shared fields (year, links, stack, images). A
 * website that is not a URL is a description, so it may be translated.
 */
function assertProjectsMatchAcrossLocales(): void {
	const [base, ...others] = (Object.keys(LANGUAGES) as UiType[]).map((lang) => ({
		lang,
		projects: getDictionary(lang).works.projects as Project[],
	}));
	if (!base) return;

	for (const other of others) {
		const baseIds = base.projects.map((project) => project.id).join(", ");
		const otherIds = other.projects.map((project) => project.id).join(", ");
		if (baseIds !== otherIds) {
			throw new Error(
				`Projects differ between "${base.lang}" (${baseIds}) and "${other.lang}" (${otherIds}): keep the same ids in the same order.`,
			);
		}

		base.projects.forEach((project, index) => {
			const counterpart = other.projects[index] as Project;
			const fields = new Set([...Object.keys(project), ...Object.keys(counterpart)]) as Set<keyof Project>;
			for (const field of fields) {
				if (TRANSLATED_FIELDS.has(field)) continue;
				if (field === "website" && !project.website?.startsWith("http")) continue;
				if (project[field] !== counterpart[field]) {
					throw new Error(
						`Project "${project.id}" has a different "${field}" in "${base.lang}" (${String(project[field])}) and "${other.lang}" (${String(counterpart[field])}).`,
					);
				}
			}
		});
	}
}

export function getProjects(lang: UiType): Project[] {
	if (!localesChecked) {
		assertProjectsMatchAcrossLocales();
		localesChecked = true;
	}
	return getDictionary(lang).works.projects as Project[];
}

/**
 * Reads the 11-character video id out of the YouTube URLs the dictionaries
 * store: watch links, short links, embeds, shorts and live links. Only a
 * YouTube host carrying a well-formed id resolves, so an unrelated link or a
 * mistyped id renders no player instead of a wrong one.
 */
export function youTubeVideoId(url: string): string | null {
	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		return null;
	}

	const host = parsed.hostname.replace(/^(?:www|m|music)\./, "");
	const [first, second] = parsed.pathname.split("/").filter(Boolean);

	let candidate: string | null = null;
	if (host === "youtu.be") {
		candidate = first ?? null;
	} else if (host === "youtube.com" || host === "youtube-nocookie.com") {
		if (first === "watch") {
			candidate = parsed.searchParams.get("v");
		} else if (first && ["embed", "shorts", "live"].includes(first)) {
			candidate = second ?? null;
		}
	}

	// `/embed/videoseries?list=…` is a playlist, not a video, and `videoseries`
	// is eleven id-shaped characters, so without this it would be handed back
	// as the id of a video that does not exist.
	if (candidate === "videoseries") {
		return null;
	}

	return candidate && /^[A-Za-z0-9_-]{11}$/.test(candidate) ? candidate : null;
}
