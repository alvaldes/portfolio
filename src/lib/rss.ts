import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getDictionary, type UiType } from "../i18n/utils";
import { getPosts } from "./blog";

/** The RSS feed of the blog in one language: the same posts, order and drafts rule as the blog index. */
export async function blogFeed(context: APIContext, lang: UiType): Promise<Response> {
	const { site, blog } = getDictionary(lang);
	const posts = await getPosts(lang);

	return rss({
		title: `${site.title} · ${blog.title}`,
		description: blog.description,
		// The channel links to the blog index; falls back to the request URL when `site` is not set, as BaseHead does.
		site: new URL(getRelativeLocaleUrl(lang, "blog"), context.site ?? context.url).href,
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
