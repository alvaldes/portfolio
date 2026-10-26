---
title: "Markdown style guide"
description: "Every Markdown element the blog supports, to check how each one looks with the site design."
pubDate: 2026-10-26
cover: ./cover.webp
coverAlt: "A Markdown symbol over a blue and pink gradient"
tags: ["Markdown", "Guide"]
draft: true
---

This article is a draft: it only shows up in `astro dev`. It is here to check how every Markdown element looks before publishing.

## Headings

Section headings use `##`. The article title comes from the frontmatter.

### Third-level heading

#### Fourth-level heading

## Text

A paragraph with **bold**, *italic*, ~~strikethrough~~, `inline code`, a [link](https://astro.build) and a key <kbd>⌘</kbd> + <kbd>K</kbd>. Footnotes work too[^1].

> A pull quote. Use it to highlight an idea or to quote someone.

## Lists

- An item
- Another item with a list inside:
  - Nested item
  - Another nested item

1. First step
2. Second step
3. Third step

- [x] Done task
- [ ] Pending task

## Code

```ts
export function greet(name: string): string {
	return `Hello, ${name}`;
}
```

```bash
bun run build
```

## Tables

| Tool | Used for | Since |
| :--- | :--- | ---: |
| Astro | Site and blog | 2024 |
| Tailwind CSS | Styles | 2023 |
| LazyVim | Editor | 2022 |

## Images

![The cover of this article](./cover.webp)

---

End of the article.

[^1]: Footnotes show up at the end, apart from the text.
