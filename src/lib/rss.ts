import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getDictionary, type UiType } from "../i18n/utils";
import { getPosts } from "./blog";
import { getProjects } from "./projects";

// The channel links to the section index; falls back to the request URL when `site` is not set, as BaseHead does.
function sectionUrl(context: APIContext, lang: UiType, section: "blog" | "works"): string {
	return new URL(getRelativeLocaleUrl(lang, section), context.site ?? context.url).href;
}

/** The RSS feed of the blog in one language: the same posts, order and drafts rule as the blog index. */
export async function blogFeed(context: APIContext, lang: UiType): Promise<Response> {
	const { site, blog } = getDictionary(lang);
	const posts = await getPosts(lang);

	return rss({
		title: `${site.title} · ${blog.title}`,
		description: blog.description,
		site: sectionUrl(context, lang, "blog"),
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: getRelativeLocaleUrl(lang, `blog/${post.slug}`),
			categories: post.data.tags,
		})),
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
		items: projects.map((project) => ({
			title: project.title,
			description: project.shortDescription,
			link: getRelativeLocaleUrl(lang, `works/${project.id}`),
			categories: project.stack.split(",").map((tech) => tech.trim()).filter(Boolean),
		})),
		customData: `<language>${lang}</language>`,
	});
}
