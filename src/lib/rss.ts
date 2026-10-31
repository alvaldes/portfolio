import rss from "@astrojs/rss";
import type { APIContext, ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getDictionary, type UiType } from "../i18n/utils";
import { getPosts } from "./blog";
import { getProjectImage, getProjects } from "./projects";

// Media RSS, so readers (and the GitHub profile README) can show a thumbnail for each item.
const XMLNS = { media: "http://search.yahoo.com/mrss/" };

// Falls back to the request URL when `site` is not set in astro.config.mjs, as BaseHead does.
function siteUrl(context: APIContext): URL {
	return context.site ?? context.url;
}

// The channel links to the section index.
function sectionUrl(context: APIContext, lang: UiType, section: "blog" | "works"): string {
	return new URL(getRelativeLocaleUrl(lang, section), siteUrl(context)).href;
}

/**
 * A <media:content> element with a JPEG of the image, the format every reader and
 * GitHub's image proxy accept, at the given width.
 */
async function mediaContent(context: APIContext, src: ImageMetadata, width: number): Promise<string> {
	const image = await getImage({ src, width, format: "jpeg" });
	const url = new URL(image.src, siteUrl(context)).href;
	const { width: w, height: h } = image.attributes as { width: number; height: number };
	return `<media:content url="${url}" medium="image" type="image/jpeg" width="${w}" height="${h}"/>`;
}

/** The RSS feed of the blog in one language: the same posts, order and drafts rule as the blog index. */
export async function blogFeed(context: APIContext, lang: UiType): Promise<Response> {
	const { site, blog } = getDictionary(lang);
	const posts = await getPosts(lang);

	return rss({
		title: `${site.title} · ${blog.title}`,
		description: blog.description,
		site: sectionUrl(context, lang, "blog"),
		xmlns: XMLNS,
		items: await Promise.all(
			posts.map(async (post) => ({
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate,
				link: getRelativeLocaleUrl(lang, `blog/${post.slug}`),
				categories: post.data.tags,
				customData: await mediaContent(context, post.data.cover, 800),
			})),
		),
		customData: `<language>${lang}</language>`,
	});
}

/**
 * The RSS feed of the projects in one language, in the Works page order. Projects
 * have no publish date, so readers that sort by date must keep the feed order.
 */
export async function worksFeed(context: APIContext, lang: UiType): Promise<Response> {
	const { site, works } = getDictionary(lang);
	const projects = await getProjects(lang);

	return rss({
		title: `${site.title} · ${works.title}`,
		description: site.description,
		site: sectionUrl(context, lang, "works"),
		xmlns: XMLNS,
		items: await Promise.all(
			projects.map(async (project) => ({
				title: project.title,
				description: project.shortDescription,
				link: getRelativeLocaleUrl(lang, `works/${project.id}`),
				categories: project.stack.split(",").map((tech) => tech.trim()).filter(Boolean),
				customData: await mediaContent(context, getProjectImage(project.id, project.thumbCard), 600),
			})),
		),
		customData: `<language>${lang}</language>`,
	});
}
