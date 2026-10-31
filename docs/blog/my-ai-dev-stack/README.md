# my-ai-dev-stack images

Sources for the images of the `my-ai-dev-stack` blog post. Each HTML file renders one image; the output goes to `src/content/blog/my-ai-dev-stack/`.

| Source | Output | Viewport |
|---|---|---|
| `cover.html` | `cover.webp` | 2000×1125, scale 1 |
| `panorama.html?lang=es` | `panorama-es.webp` | 1200×760, scale 2 |
| `panorama.html?lang=en` | `panorama-en.webp` | 1200×760, scale 2 |

`panorama.html` keeps its labels in the `T` object at the bottom of the file, one entry per language.

## Render

Open the file in a Chromium browser at the viewport above, take a screenshot, and convert it:

```bash
cwebp -q 88 screenshot.png -o ../../../src/content/blog/my-ai-dev-stack/cover.webp
```

## Video: ego-browser-landing.mp4

`record-landing.mjs` drives the Netty landing in ego-browser and captures every frame through CDP, so the scroll is smooth even though each capture takes ~230 ms. `zoom.py` then adds the zooms on the download button and the FAQ.

```bash
ego-browser nodejs < record-landing.mjs        # writes frames/ to the scratch path set in OUT
python3 -I zoom.py <frames> <zoomed>
ffmpeg -framerate 30 -i <zoomed>/f%04d.png -vf scale=1280:-2:flags=lanczos \
  -c:v libx264 -crf 28 -preset veryslow -tune animation -pix_fmt yuv420p -movflags +faststart \
  ../../../public/blog/my-ai-dev-stack/ego-browser-landing.mp4
```

## Video: herdr-agents.mp4

Recorded live, not rendered. A local clone of Netty runs in an isolated herdr session (`herdr --session blog-demo`), with worktrees made by `herdr worktree create` and one Claude Code agent per workspace on read-only prompts. The window sits alone on an empty AeroSpace workspace and `screencapture -v -V38 -R<window rect>` records it. Then:

```bash
ffmpeg -ss 1.5 -to 31.5 -i herdr.mov -an \
  -vf "crop=2400:1350:0:0,setpts=PTS/1.25,fps=30,scale=1280:-2:flags=lanczos,fade=t=in:st=0:d=0.4,fade=t=out:st=23.6:d=0.4" \
  -c:v libx264 -crf 26 -preset veryslow -tune animation -pix_fmt yuv420p -movflags +faststart herdr-agents.mp4
```

Clean up afterwards with `herdr session stop blog-demo`, `herdr session delete blog-demo`, and `git worktree remove` for each worktree.

## Icons

`icons/` holds the app icons. Ghostty, Obsidian, Tailscale, ego lite, and BetterWispr come from each app's `.icns`; herdr from herdr.dev; the mustache is the Gentleman Programming GitHub avatar. The GitHub mark is inlined as SVG from Simple Icons.
