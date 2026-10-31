import type { APIRoute } from "astro";
import { blogFeed } from "../lib/rss";

export const GET: APIRoute = (context) => blogFeed(context, "es");
