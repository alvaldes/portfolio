import type { ImageMetadata } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import type { UiType } from "../i18n/utils";

// Project images live in src/assets/projects/<id>/ so Astro can process them at build time.
const PROJECT_IMAGES = import.meta.glob<{ default: ImageMetadata }>("/src/assets/projects/**/*.webp", {
	eager: true,
});

/**
 * Resolves a file name from src/content/projects.json, such as "thumbCard.webp", to the
 * imported asset in the project's folder. Fails the build when the file is
 * missing, instead of shipping a broken image.
 */
export function getProjectImage(projectId: string, fileName: string): ImageMetadata {
	const key = `/src/assets/projects/${projectId}/${fileName}`;
	const image = PROJECT_IMAGES[key];
	if (!image) {
		throw new Error(`Project image not found for "${projectId}": ${fileName} (expected ${key})`);
	}
	return image.default;
}

export type Project = CollectionEntry<"projects">["data"] & {
	id: string;
	shortDescription: string;
	websiteNote?: string;
	// The long description, rendered with `render()` from astro:content.
	description: CollectionEntry<"works">;
};

/**
 * Joins the shared data of every project with its text in the given language.
 * Fails the build when a project has no Markdown file for that language, or a
 * Markdown file has no project, instead of shipping a page without content.
 */
export async function getProjects(lang: UiType): Promise<Project[]> {
	const [projects, works] = await Promise.all([getCollection("projects"), getCollection("works")]);
	const texts = new Map(works.map((work) => [work.id, work]));

	for (const work of works) {
		const [projectId] = work.id.split("/");
		if (!projects.some((project) => project.id === projectId)) {
			throw new Error(
				`"src/content/works/${work.id}.md" has no project with the id "${projectId}" in src/content/projects.json.`,
			);
		}
	}

	const orders = new Set(projects.map((project) => project.data.order));
	if (orders.size !== projects.length) {
		throw new Error('Two projects share the same "order" in src/content/projects.json.');
	}

	return projects
		.toSorted((a, b) => a.data.order - b.data.order)
		.map(({ id, data }) => {
			const description = texts.get(`${id}/${lang}`);
			if (!description) {
				throw new Error(`Project "${id}" has no text in "${lang}": add src/content/works/${id}/${lang}.md.`);
			}
			return { ...data, id, ...description.data, description };
		});
}

/**
 * Reads the 11-character video id out of the YouTube URLs the projects
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
