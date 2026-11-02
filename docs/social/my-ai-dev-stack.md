# Social posts: my AI dev stack

Promotion copy for the post "No programo solo: dirijo un equipo de agentes" / "I don't code alone: I lead a team of agents".

- Spanish post: https://www.alvaldes.dev/es/blog/my-ai-dev-stack/
- English post: https://www.alvaldes.dev/blog/my-ai-dev-stack/

Both URLs returned 200 with the right canonical on 2026-11-01.

## Where it is published

| Channel | Status | Link or note |
|---|---|---|
| LinkedIn (Spanish) | Published 2026-11-01 | https://www.linkedin.com/feed/update/urn:li:activity:7522801485064364032/. With `panorama-es.png` (alt text from the blog), mentions the Gentleman Programming company page, link in the first comment. |
| X (@alvaldes_) | Published 2026-11-01 | https://x.com/alvaldes_/status/2117034502086435238. Five-post thread with `panorama-en.png`, link in the last post. Tags @G_Programming. |
| Threads (@alvaldes_) | Published 2026-11-01 | In English, with `panorama-en.png`, links to the English post. Tags @gentlemanprogramming. https://www.threads.com/@alvaldes_/post/DfN7k-1gNRg |
| Medium | Published 2026-11-01 | https://medium.com/@alvaldes/i-dont-code-alone-i-lead-a-team-of-agents-e5643ec912fb. Title fixed, table replaced by a list, the nine images uploaded by hand (the importer dropped every WebP image and all five videos; the three video spots use their poster with the caption "Video in the original post at alvaldes.dev", the three Gentleman banners were left out). Canonical not checked yet: Medium returns 403 to curl, so open the page source in a browser. |
| Dev.to | Published 2026-11-01 | https://dev.to/alvaldesdev/i-dont-code-alone-i-lead-a-team-of-agents-3km3. Cover 1000×420, tags ai, productivity, devtools, opensource; canonical to the blog (checked with the API). |
| Hashnode | Published 2026-11-01 | https://alvaldes.hashnode.dev/i-don-t-code-alone-i-lead-a-team-of-agents. Cover 1600×840 (also the OG image), five tags, SEO description. The canonical did not save from the draft; fixed after publishing and checked in the page head. |

Scores come from the local `li-human` heuristics. Its VOICE check counts English contractions and pronouns, so Spanish text always scores low there.

## Media to attach

No carousel for this post. Use the cover (`src/content/blog/my-ai-dev-stack/cover.webp`) or the stack diagram (`panorama-es.webp` for Spanish, `panorama-en.webp` for English). Convert to PNG first if a network rejects WebP. The 41-second film `public/blog/my-ai-dev-stack/netty-end-to-end.mp4` also works as a native video on X, LinkedIn and Threads.

## LinkedIn (Spanish)

Hook: #17 Time Anchor. 1171 characters. Human score 55.0 REVIEW (only VOICE fails). Attach `panorama-es.webp` or the film.

```text
12:25: Netty era una nota en Markdown.
22:58 del mismo día: la app y su landing ya existían, con 38 commits en el medio.

Tres días después estaba lanzada. Y yo casi no escribí código.

Tampoco le pedí a una IA "hazme una app" y me fui a tomar un café. Trabajé como project manager de un equipo de agentes. Cada agente escribía código y lo probaba. Yo revisaba y decidía qué seguía.

Lo que lo hizo posible fue el stack:

🖥️ Ghostty + herdr: varios agentes en paralelo, cada uno en su propio worktree de git.
🧠 Gentle AI + Engram, de @Gentleman Programming: reglas de trabajo y memoria. El agente buscó en la memoria de JUMP, otro proyecto mío, los errores que ya había cometido ahí, y no los repitió.
👀 ego-browser: el agente veía la web que diseñaba, sacaba capturas y corregía lo que no funcionaba.
🎙️ BetterWispr: les hablo a los agentes en vez de escribirles.
📱 Tailscale: si un agente se trababa, lo destrababa desde el teléfono.

Lo que no cambió: alguien tiene que saber si el trabajo está bien. Un agente se equivoca con la misma confianza con la que acierta.

Los agentes ejecutan. Yo dirijo.

¿Qué parte de tu flujo con agentes sigues haciendo a mano?

#AI #DeveloperExperience #OpenSource
```

Tag: type "@Gentleman" and pick the company page from the dropdown (https://www.linkedin.com/company/gentleman-programming/); pasted text does not create the mention.

First comment:

```text
El stack completo, pieza por pieza, con los videos de cada herramienta: https://www.alvaldes.dev/es/blog/my-ai-dev-stack/
```

## X (English)

Organic thread, 5 posts, each under 280 characters (the URL counts as 23). Human score 72.8 PASS. Attach `panorama-en.webp` or the film to the first post.

1/5

```text
At 12:25 on October 27, Netty was an idea.md file. By 22:58 the app and its landing page existed, with 38 commits in between.

I barely wrote any of the code. I worked as the project manager of a team of AI agents. 🧵
```

2/5

```text
Each agent got its own git worktree and ran in parallel in herdr, inside Ghostty. One built the app, another built the website. I reviewed every result and decided what came next.
```

3/5

```text
The agents had rules and memory, both from @G_Programming. Gentle AI defines how they work, Engram remembers. On Netty, the agent searched the memory of JUMP, my previous Mac app, for the mistakes it made there and didn't repeat them.
```

4/5

```text
They also had eyes. With ego-browser the agent opened the landing page, took screenshots, saw what looked wrong and fixed it. And when one got stuck, I unblocked it from my phone over Tailscale.
```

5/5

```text
An agent is wrong with the same confidence it's right, so the review stays mine. The agents execute. I direct.

The whole stack, piece by piece:
https://www.alvaldes.dev/blog/my-ai-dev-stack/
```

## Threads (English)

Switched from Spanish to English on 2026-11-01, before posting. 491 of 500 characters. Human score 78.9 PASS. Attach `panorama-en.png`. The mention autocompletes to the Gentleman Programming account.

Avoid writing `idea.md` on Threads and LinkedIn: both turn it into a link to http://idea.md (`.md` is Moldova's domain). X does not.

```text
At 12:25 on October 27, Netty was a Markdown note. By 22:58 the app and its landing page existed, with 38 commits in between.

I barely wrote any of the code. I worked as the project manager of a team of AI agents: each in its own worktree, in parallel, with rules and memory from @gentlemanprogramming and a browser to see what it was designing. I reviewed and decided what came next.

The agents execute. I direct.

My stack, piece by piece 👇
https://www.alvaldes.dev/blog/my-ai-dev-stack/
```

## Dev.to and Hashnode (English)

Same Markdown body for both, built from `en.md`: images point at their absolute `www.alvaldes.dev/_astro/...` URLs, each `<video>` becomes its poster image linked to the post with the caption "Video in the original post", and internal links are absolute. The table stays (both render Markdown tables). Covers are center crops of `cover.webp`.

## Medium (English)

Import with **Stories → Import a story** and the English URL: https://www.alvaldes.dev/blog/my-ai-dev-stack/.

After the import, before publishing:

1. Fix the title: remove " | Angel L. Valdés" so it reads "I don't code alone: I lead a team of agents".
2. Replace the "full picture" table with this list:

```text
Terminal: Ghostty. Where everything lives.
Workspaces: herdr. Keeps the agents running in parallel in order.
Version control: Git and GitHub. Gives each agent its own space.
Agents: Gentle AI, Gentle Shell, and Engram. Define how the agent works and what it remembers.
Browser: ego-browser. Gives the agent eyes and hands on the web.
Voice: BetterWispr. Lets me talk to the agents instead of typing.
Knowledge: Obsidian. My second brain, shared with the agents.
```

3. The post has five `<video>` elements (herdr agents, three Gentleman banners, ego-browser landing, Netty end to end). The importer will probably drop them. Where one is missing, paste its poster image from `public/blog/my-ai-dev-stack/*-poster.webp`, or a YouTube link if the film is uploaded there.
4. Check the cover, the panorama, the dots repo, worktrees, BetterWispr and Obsidian images came through.
5. Internal links (`/blog/introducing-netty/`, `/blog/introducing-jump/`, `/blog/launch-skills/`, `#contact-me`) are relative on the site; make sure they point at `https://www.alvaldes.dev/...` after the import.

After publishing, check the page source for "canonical": it must point at the www.alvaldes.dev URL. If not, set it in **More settings → Advanced settings**.

Topics (up to five): Artificial Intelligence, AI Agents, Developer Tools, Productivity, Software Development.
