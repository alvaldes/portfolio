import type { ImageMetadata } from "astro";
import { getDictionary, type UiType } from "../i18n/utils";

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

export function getProjects(lang: UiType): Project[] {
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
