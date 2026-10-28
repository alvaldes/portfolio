Objective: move Works to Content Collections (drop `marked`), then add a bilingual Markdown blog.
Branch: refactor/works-content-collections (PR 1), then a blog branch (PR 2). Delivery: two PRs, user-owned.
Test runner: none; checks are `astro check` + `astro build` and an HTML diff against the baseline build.

## Specs

- S1 (PR 1): "mover Works para trabajar con Content Collection y así quitarnos la dependencia de marked". Every Works page renders the same content as before; `marked` is removed from the dependencies.
- S2 (PR 2): a "pestaña como la de works pero para blogs" with a simple design: "imagen y titulo" per post, following the reference screenshot.
- S3 (PR 2): posts render "a partir de archivos markdown pero con nuestro propio estilo", translating every Markdown element to the site design.
- S4 (PR 2): "cada post en español e inglés".
- S5 (PR 2), assumption: each post declares a canonical URL so cross-posts on Medium point back to the portfolio.

## Tasks

- T1 S1 inline: shared project data in `src/content/projects.json`, per-language Markdown in `src/content/works/<id>/<lang>.md`, `WorkDetail` renders the body, `marked` removed. Status: done in 58c1b39; all 23 pages match the baseline build (only `&#39;` -> `'` in two text nodes).
- T2 S2-S5 inline: blog collection, list page, post page, content styles. Status: done in 1a24a4c on feat/blog (README fix for PR 1 in 7ad4fb4). Checked in dev (desktop, phone, light, dark), production build, missing-language and date-mismatch build errors, existing pages diffed against the baseline.

## Log

- L1 (2026-10-26): "Estoy listo para crear la nueva parte del portfolio que serían los blogs [...] Para esto vamos a crear una pestaña como como la de works pero para blogs y ahí vamos a ir agregando todos los articulos. Con un disenno simple (imagen y titulo) del post [...] tiene que funcionar renderizando el contenido a partir de archivos markdown pero con nuestro propio estilo asi que hay que hacer una traduccion de los elementos md a nuestro disenno."
- L2 (2026-10-26): "1, cada post en español e inglés. [...] quizás sea el momento también de mover Works para trabajar con Content Collection y así quitarnos la dependencia de marked."
- L3 (2026-10-26): "Dale, arrancá con el PR 1 de works". Baseline build: 23 pages, saved outside the repo for the HTML diff.
- L5 (2026-10-26): "resolvamos smartypants viendo que se puede romper en works sino se rompe nada lo aplicamos. Ademas arregla lo de og:image y despues es que podemos hacer el PR". Smartypants on (fd7dc94: only two apostrophes change in Works); default social cards per language (8c411f9). PR 2 opened: https://github.com/alvaldes/portfolio/pull/5.
- L4 (2026-10-26): "Hacé push y abrí el PR 1". PR 1 opened: https://github.com/alvaldes/portfolio/pull/4 (58c1b39). Next: T2 on a blog branch.
