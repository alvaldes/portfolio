# Social posts: JUMP launch

Promotion copy for the post "JUMP: el teclado también fuera del navegador" / "JUMP: keyboard-first, even outside the browser".

- Spanish post: https://www.alvaldes.dev/blog/introducing-jump/
- English post: https://www.alvaldes.dev/en/blog/introducing-jump/

> Before posting: `astro.config.mjs` still sets `site` to `https://alvaldes.vercel.app`, which redirects (307) to `www.alvaldes.dev`. Until that changes, the post's `canonical`, `og:url`, `hreflang` and `og:image` point at the old domain.

Scores come from the local `li-human` heuristics (not GPTZero or any commercial detector). Its VOICE check counts English contractions and pronouns, so Spanish text always scores low there.

## Carousel (every network)

Three slides in English, 1080×1350 (4:5), kept outside the repo in `~/Downloads/JUMP-carousel/`: `JUMP.pdf` (LinkedIn document) and `stitchslide-01.png` to `stitchslide-03.png` (image networks).

1. JUMP: "Click anything on your Mac without touching the mouse." Appearance settings.
2. Behavior settings: "The modifier for each click action, the letters, labels, themes and sizes. Yours to adjust."
3. "Change the shortcuts or turn them off in the apps you choose. Try it now. Download for Mac." General settings.

The "Download for Mac" button is part of the image, so it is not a link anywhere.

## LinkedIn (Spanish): published 2026-10-26

Posted with `JUMP.pdf` as a document. Hook: #12 The Comparison. The text below is the published version, which differs from the draft.

```text
Homerow: de pago y cerrado. Vimac: free, pero sin cambios desde 2022.
Así que construí la tercera opción.

Se llama JUMP. Es una app para macOS que reemplaza el mouse por el teclado, gratis y de código abierto.

En el navegador casi no toco el mouse. Uso Surfingkeys, y los atajos de Vim ya los tengo memorizados después de años de usarlos. Fuera del navegador era otra historia: para un solo clic en Finder o en otra app tenía que soltar el teclado, buscar el mouse y volver.

⌨️ ⌘⇧Space: cada elemento clicable recibe una etiqueta. La escribes y JUMP hace click.
🧭 ⌘⇧J: scroll con h j k l.
🔍 ⌘⇧F: busca texto visible, sin importar mayúsculas ni acentos.

Por dentro lee la interfaz de las otras apps con la Accessibility API de macOS, y para las terminales y los PDF, que no exponen su texto, tiene un OCR opcional.

Parte del código de Vimac (GPL-3.0). Gracias a Dexter Leng y a su comunidad.
Son milisegundos. Pero se repiten todo el día, y cuando te obsesiona la productividad, cada uno cuenta.

¿Qué tarea de tu día todavía te obliga a soltar el teclado?

#OpenSource #macOS #DeveloperExperience
```

First comment (published):

```text
Si quieres saber por qué lo construí? y las decisiones de ingeniería detrás: https://www.alvaldes.dev/blog/introducing-jump/
```

Suggested edit for the comment, which is missing the opening "¿":

```text
Si quieres saber por qué lo construí y las decisiones de ingeniería detrás: https://www.alvaldes.dev/blog/introducing-jump/
```

## X (English)

### Ad from ads.x.com

Carousel with the three slides (all 4:5, one ratio per carousel). X's current specs list 4:5 for image carousels with 2 to 6 cards, at 1440×1800 recommended; older guides still say 1:1 or 1.91:1 only, so confirm in the upload form.

- Destination: https://www.alvaldes.dev/en/blog/introducing-jump/ (the portfolio, not the download page, so the visit lands on the portfolio; the post links to the download).
- Post copy: 266 characters, no link (the destination is on the cards). Human score 72.7 PASS.

```text
Homerow is paid. Vimac is free, but nobody has touched it since 2022.

So I built my own.

JUMP is an open-source macOS app: press ⌘⇧Space, every clickable element in the window gets a short label, and typing that label clicks it without the mouse.

How I built it 👇
```

### Organic thread (alternative)

Four tweets, each under 280 characters (longest: 274). Human score 80.2 PASS. Attach the three slide images to the first tweet.

```text
Homerow is paid and closed source. Vimac is open source, but nobody has touched it since 2022.

So I built my own. 🧵

JUMP is a free, open-source macOS app that replaces the mouse with the keyboard.
```

```text
Press ⌘⇧Space and every clickable element in the focused window gets a short label, so you type two letters and JUMP clicks the thing for you.

⌘⇧J scrolls with h j k l.

⌘⇧F finds visible text.
```

```text
Under the hood it reads other apps' UI through macOS's Accessibility API. Terminals and PDFs don't expose their text that way, so there's an optional Vision OCR fallback whose captures never leave memory.

No Mac App Store, though: apps that use that API can't be sandboxed.
```

```text
I wrote up why I built it, how the Accessibility API and the OCR fallback fit together, and the code signing bug that wiped the permission on every build:
https://www.alvaldes.dev/en/blog/introducing-jump/
```

## Threads (Spanish)

491 of 500 characters. Human score 64.3 REVIEW (only VOICE fails). Attach the three slide images.

```text
En el navegador casi no toco el mouse. Surfingkeys me resolvió eso. Fuera del navegador, cada clic en Finder o en la configuración de macOS me obligaba a soltar el teclado, buscar el mouse y volver.

Busqué alternativas. Homerow es de pago y cerrado, y Vimac no tiene cambios desde 2022.

Así que hice JUMP. Presionas ⌘⇧Space, cada elemento clicable recibe una etiqueta, la escribes y hace clic. Gratis y de código abierto.

Cómo lo construí 👇
https://www.alvaldes.dev/blog/introducing-jump/
```

## Instagram (Spanish)

Carousel post with `stitchslide-01.png` to `stitchslide-03.png` (4:5 at 1080×1350 is Instagram's native portrait size, no cropping). 779 characters. Human score 59.4 REVIEW (only VOICE fails).

- Links in captions and comments are not clickable, and the bio link stays as it is. The caption names a short address people can type: `alvaldes.dev/blog` redirects to https://www.alvaldes.dev/blog, where the post is featured. Optional: a story with a link sticker to https://www.alvaldes.dev/blog/introducing-jump/, saved to a highlight named "JUMP", adds a clickable link.
- Alternative: "Comenta JUMP y te mando el artículo por DM" (more comments, but every DM is answered by hand).
- Instagram caps hashtags at five per post since December 2025; this caption uses three.

```text
Homerow es de pago. Vimac es gratis, pero nadie lo toca desde 2022. Así que hice el mío.

JUMP es una app de código abierto para macOS que reemplaza el mouse por el teclado.

⌨️ ⌘⇧Space: cada elemento clicable recibe una etiqueta. La escribes y JUMP hace clic.
🧭 ⌘⇧J: scroll con h j k l.
🔍 ⌘⇧F: busca texto visible.

En el navegador ya trabajaba así con Surfingkeys. Fuera de él, cada clic en Finder o en cualquier otra app me obligaba a soltar el teclado, buscar el mouse y volver, y eso se acumula a lo largo del día.

Por dentro usa la Accessibility API de macOS, y para terminales y PDF tiene un OCR opcional con Vision.

El artículo sobre cómo lo construí está en alvaldes.dev/blog

¿Qué tarea todavía te obliga a soltar el teclado?

#OpenSource #macOS #DeveloperExperience
```

## Medium (English)

Import with **Stories → Import a story** and the English URL: https://www.alvaldes.dev/en/blog/introducing-jump/. The importer adds the canonical link and keeps the original date.

Medium's editor has no tables, so the shortcuts table needs replacing by hand after the import. Paste this list in its place:

```text
⌘⇧Space (Hints): labels every clickable element. Type a label to click it.
⌘⇧J (Scroll): scrolls the window Vim-style: h j k l, d u, gg G.
⌘⇧F (Search): finds visible text, ignoring case and accents.
```

Before publishing, check that the cover image, the settings image, the `swift test` code block and the quote came through. After publishing, open the page source and search for "canonical": it must point at the www.alvaldes.dev URL. If it does not, set it in **More settings → Advanced settings → "This story was originally published elsewhere"** and publish again.

Topics (up to five): macOS, Open Source, Productivity, Swift, Software Development.

### Medium profile

Short bio (140 of 160 characters). Swap the last sentence for "Open to work." while job hunting.

```text
Software engineer in Mexico. Frontend, UX/UI and LLM-powered products. I build open-source tools like JUMP and write about how I build them.
```

About page (1,758 characters). Human score 77.1 PASS. Every fact comes from the portfolio's home page and project descriptions.

```text
I'm Angel. Software engineer, based in Mexico, programming since 2016. These days I work mostly on the frontend, on UX/UI, and on products built around LLMs.

Right now I'm doing a Master's in Software Engineering at the Technological University of the Mixteca (UTM) in Oaxaca. My research looks at how LLMs can automate requirements engineering, which in practice means taking the messy way people describe what they need and turning it into something a team can actually build.

Before that, I spent almost two years at GENTALIA building public transportation apps for the Basque Country in Spain, with Angular and Spring Boot. Lurraldebus shows real-time arrivals and plans routes between towns. LurTicket sells long-distance tickets from your phone. Earlier, at CUJAE University in Havana, I built websites with React and Spring Boot and trained new people on the team. I studied Computer Science Engineering at the University of Informatics Sciences (UCI), also in Havana.

On the side I build tools I want to use myself. Most are open source:

- JUMP, a macOS app that lets you click anything on screen from the keyboard.
- Storico, which turns natural-language user stories into structured Kanban tasks with an LLM.
- Flowmodoro, a focus timer that counts up while you work and gives you a break proportional to your flow time.
- LocalLLM-DataForge, a small pipeline for building synthetic datasets with local Ollama models.

Here I write about the tools I use and how I build mine. The decisions, the trade-offs, the bugs. I spend my day in Neovim with LazyVim and I touch the mouse as little as I can, so expect a lot of keyboard.

Everything I've built is on my portfolio: https://www.alvaldes.dev
The code is on GitHub: https://github.com/alvaldes
```
