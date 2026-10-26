import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

// Data shared by every language.
const projects = defineCollection({
	loader: file("src/content/projects.json"),
	schema: z.object({
		// Position on the Works page; getCollection() does not keep the file order.
		order: z.number().int(),
		title: z.string(),
		year: z.string(),
		stack: z.string(),
		platform: z.string(),
		active: z.number(),
		website: z.url().optional(),
		sourceCode: z.url().optional(),
		// A YouTube link or a path to a video under public/.
		video: z.string().optional(),
		channel: z.url().optional(),
		videoPoster: z.string().optional(),
		thumbCard: z.string(),
		thumbFirst: z.string(),
		thumbMockup: z.string(),
	}),
});

// One file per project and language, src/content/works/<id>/<lang>.md: the body is the long description.
const works = defineCollection({
	loader: glob({ pattern: "*/*.md", base: "src/content/works" }),
	schema: z.object({
		shortDescription: z.string(),
		// Shown instead of a link when the project has no public website.
		websiteNote: z.string().optional(),
	}),
});

export const collections = { projects, works };
