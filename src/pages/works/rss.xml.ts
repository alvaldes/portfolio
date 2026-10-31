import type { APIRoute } from "astro";
import { worksFeed } from "../../lib/rss";

export const GET: APIRoute = (context) => worksFeed(context, "es");
