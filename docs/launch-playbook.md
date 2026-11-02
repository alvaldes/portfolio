# Launch playbook

Where to publish a new tool (an app, a library, a post), what each place requires, and how the submission works. Built from launching JUMP on 2026-10-26 to 2026-10-28; every rule below was read on the site itself on those dates. Re-check a channel's rules before relying on them: several changed during 2026.

The per-launch record (copy, links, status) lives next to this file, for example [`social/introducing-jump.md`](social/introducing-jump.md).

## How to read each channel

- **Fit**: what kind of tool the channel accepts.
- **Gate**: what the account or project needs before the channel takes it.
- **Format**: fields, limits and assets.
- **How**: the submission path.
- **Automation**: how much a skill can do. `CLI` (gh, API), `browser` (form filled with ego-browser), `draft` (text prepared, the human posts), `manual`.

A skill must never press the final publish or submit button on a public channel without an explicit yes in that turn. Sign-ins, payments and CAPTCHAs are always the human's.

## Before any launch: the asset kit

Prepare once per tool and reuse everywhere.

| Asset | Spec | Used by |
|---|---|---|
| Name | Official spelling, no tagline | Everywhere |
| Tagline | One line, under 60 characters, says what it does | Product Hunt, Indie Hackers, AlternativeTo |
| Short description | One sentence, ends with a period | awesome lists, AlternativeTo |
| Long description | 200 to 500 words: problem, how it works, platform, price, license | AppAddict, AlternativeTo, Product Hunt |
| Comparison | 1 or 2 named competitors and what is better, honestly | r/macapps (PCP), Product Hunt, posts |
| Icon | Transparent PNG, 512×512 or larger (1024 source) | MacUpdate, AlternativeTo, Indie Hackers, awesome lists |
| Screenshots | PNG/JPG; the first one shows the tool in action | Every directory |
| Gallery images | 1270×760 PNG | Product Hunt |
| Article cover | 1000×420 (Dev.to), 1600×840 (Hashnode) | Article cross-posts |
| Blog post | The canonical write-up on the own site, in English and Spanish | Article cross-posts, iOS Dev Weekly |
| Carousel | 1080×1350 (4:5) slides plus a PDF | LinkedIn, X, Instagram |
| Raw asset URLs | Icon and screenshots reachable at `raw.githubusercontent.com` | open-source-mac-os-apps |
| Repo metadata | Description, homepage, topics | GitHub search |
| Download path | GitHub release, Homebrew cask | Directories, forms |

Two warnings learned the hard way:

- **The blog's canonical URL must be the final domain.** `astro.config.mjs` sets `site: 'https://www.alvaldes.dev'`; a `site` that redirects (the old `alvaldes.vercel.app`) makes the post's canonical disagree with its cross-posts.
- **Write in the human's voice.** r/macapps, r/opensource and awesome-macOS remove or ban text that reads as AI-written (em dashes are a known trigger). Drafts are a starting point; the human rewrites them.

## Channels

### Owned and social

#### Own blog
- **Fit**: anything. It is the canonical source every cross-post points to.
- **How**: a post in `src/content/blog/<slug>/{en,es}.md` with a cover image; build with `npm run build`.
- **Automation**: CLI. A skill can draft the post from the project's README and design notes, build and commit it.

#### GitHub repository
- **Fit**: any open-source project.
- **How**: `gh repo edit <owner>/<repo> --add-topic a,b,c`; set the description and homepage.
- **Automation**: CLI.

#### LinkedIn
- **Fit**: anything; the audience is the professional network.
- **Format**: text post plus a document carousel (PDF). Links inside the post reduce reach: put the link in the first comment.
- **How**: written by the human with the `li-post` skill; `li-human` checks the voice.
- **Automation**: draft.

#### X
- **Fit**: anything.
- **Format**: 280 characters per post; an image carousel takes 2 to 6 cards. The organic route is a thread with the link in the last post; the paid route is a carousel ad from ads.x.com.
- **Gotchas**: avoid tagging a competitor in a comparison; keep the profile bio current, since launch visitors read it.
- **Automation**: draft.

#### Threads
- **Fit**: anything.
- **Format**: 500 characters; attach the carousel images, a text-only post gets less attention.
- **Automation**: draft.

#### Instagram
- **Fit**: visual tools.
- **Format**: 4:5 carousel at 1080×1350. Links in captions are not clickable; name a short address or use a story link sticker. At most five hashtags per post.
- **Automation**: draft.

### Article platforms (cross-posts of the blog post)

All three take the same article; the canonical URL is what keeps search engines crediting the blog.

#### Dev.to
- **Gate**: an account (GitHub sign-in works).
- **Format**: title, up to 4 tags, cover 1000:420, Markdown body; canonical URL in **Advanced Options**. The default editor ignores front matter, so fill each field. Tags commit with a real comma key press.
- **How**: create, save as draft, check the preview, publish. The public API confirms it: `GET https://dev.to/api/articles/<user>/<slug>` returns `published_at` and `canonical_url`.
- **Automation**: browser (the Dev.to API with an API key would make it CLI).

#### Hashnode
- **Gate**: an account and a publication (blog) created first; the subdomain is chosen once.
- **Format**: Markdown mode, cover 1600×840, subheading; tags, SEO description and canonical URL ("Are you republishing?") in **Draft settings → Discovery**.
- **How**: the Publish button opens Draft settings; the final Publish is inside it.
- **Gotcha**: the canonical URL can fail to save (seen 2026-11-01). After publishing, check `<link rel="canonical">` in the page head; to fix it, open the post from **Drafts → Published** (an `/edit/` URL, not the old `/draft/` one) and press **Update**.
- **Automation**: browser (Hashnode also has a GraphQL API).

#### Medium
- **How**: **Stories → Import a story** with the English URL; the importer sets the canonical and the original date.
- **Gotchas**: no tables (replace them by hand with a list); the importer copies the page `<title>`, so a site suffix like " | Angel L. Valdés" lands in the story title. Fix the title after importing. The importer also drops every WebP image and every `<video>` (seen on 2026-11-01 with `my-ai-dev-stack`): convert the images to PNG and upload them by hand, and use each video's poster with a caption pointing at the original post.
- **Automation**: draft plus a manual import.

### Launch communities

#### Product Hunt
- **Fit**: any product people can use.
- **Format**: name, tagline, description, product categories (up to 3), launch tags (up to 3), pricing, links, logo, gallery (1270×760, the first image is the share preview), optional video, first comment from the maker. Choose **I made this** so the account shows as Maker.
- **How**: Submit → paste the URL → the draft autosaves → **Schedule launch** (launches start at 12:01 a.m. Pacific).
- **Rules**: do not ask for upvotes directly; invite people to look.
- **Automation**: browser for the draft; the human schedules.

#### r/macapps
- **Fit**: macOS apps.
- **Gate**: 10 karma earned in r/MacApps; rules marked as read; verified email. Main-feed posts need Tier 1 (Mac App Store, or a repo with one year of history or 100+ stars) or Tier 2 (a real-identity portfolio with LinkedIn and contact details, **and** an app website with a Privacy Policy and Terms of Service). Everyone else posts in the monthly megathread "The App Pile".
- **Format**: PCP: Problem, Comparison (name 1 or 2 competitors), Pricing with amounts and a link (no direct .dmg/.zip). Open-source apps prefix the title with `[OS]`. Flair Free for free apps.
- **Rules**: one promotion per developer every 30 days (Rule 3), counted even if the post was removed; disclose that you are the developer.
- **Automation**: draft; the human posts.

#### r/opensource
- **Fit**: open-source projects with an OSI license file.
- **Gate**: an account with history; self-promotion under about 10% of posts; no drive-by posting.
- **Rules**: "All AI-generated content is low-effort and ban worthy"; flair **Promotional**.
- **Automation**: manual. The human writes it; a skill can only check it against the rules.

#### Hacker News (Show HN)
- **Fit**: something people can run, made by the poster, non-trivial. No landing pages: link the repo.
- **Gate**: new accounts are redirected to `/showlim`; the account needs real participation first.
- **Format**: title starting with `Show HN:`, URL, and text with the backstory (it shows at the top of the thread). Do not ask for upvotes.
- **Automation**: draft; the human submits.

#### Indie Hackers
- **Gate**: posts are open to established members only. Product pages are open to everyone.
- **Format** (product page): name, tagline (60 characters), website, logo (200×200 or larger, square); then motivation (220 characters), start date, founder skillset, founders, employees, business model, funding, commitment, platforms and tags, all required to appear in the directory.
- **Automation**: browser.

### Directories

#### AlternativeTo
- **Fit**: any software.
- **Format**: name, website, short and full description (no links), pricing, license model and license, source URL, tags, features, platforms with notes, author with country and website, icon, screenshots with captions.
- **How**: submit, then add existing apps as alternatives; without alternatives the app barely shows up in search.
- **Gotchas**: the free review queue holds thousands of apps and may take a very long time; priority review costs $9 and human content review $19. The human decides whether to pay.
- **Automation**: browser.

#### MacUpdate
- **Format**: name, developer, download URL, product page, support URL, version, price; short and long description, version changes, system requirements; one transparent PNG icon (512×512 preferred); up to 5 PNG/JPG screenshots under 8 MB; comments for the reviewers.
- **Gotchas**: mention an unnotarized build in the comments, or reviewers may reject it as broken.
- **Automation**: browser.

#### Indie Goodies (Open Source Mac Apps)
- **Format** (Airtable form): name, description, link, icon URL, screenshot URL, category (Keyboard, Productivity, Menu Bar, and others).
- **Automation**: browser.

#### MacMenuBar
- **Fit**: apps that live in the menu bar, where removing the icon would break how people use them. Not a fit for tools driven mainly by global shortcuts.
- **Gate**: an email address on the app's own domain (Gmail, Hotmail, Outlook and similar are refused, and the submit button does not appear).
- **Format**: name, URL, optional YouTube demo, Free/Freemium/Paid, message, and at least 3 screenshots showing the app in the actual menu bar.
- **Automation**: browser, once the domain email exists.

#### Applite
- **Fit**: apps in the official Homebrew cask catalog only; there is no submission form.
- **Gate**: an accepted cask in `homebrew/cask`, which requires passing Gatekeeper (notarized) and meeting Homebrew's notability metrics.
- **Automation**: not applicable until the cask exists.

### Curated lists on GitHub

#### awesome-mac (jaywcjlove)
- **Format**: one line per app in `README.md`, `README-zh.md`, `README-ja.md` and `README-ko.md`, in the closest category, alphabetical, one-sentence description, OSS/Freeware/Native icons. One PR per app.
- **How**: fork, branch, edit the four files, PR with the template. The repo ships a maintainer skill at `.codex/skills/awesome-mac-maintainer`.
- **Automation**: CLI.

#### open-source-mac-os-apps (serhii-londar)
- **Format**: one entry appended to `applications.json` (never `README.md`): title, short description ending with a period, categories from `categories.json`, repo URL, icon URL, screenshot URLs, official site, languages.
- **How**: fork, branch, append, validate the JSON, PR with the template.
- **Automation**: CLI.

#### awesome-macOS (iCHAIT)
- **Status**: closed to public submissions since 2026-10-27 (issue #1338); pull requests are limited to collaborators. Skip it.

### Newsletters and niche media

#### AppAddict
- **Fit**: independent Mac apps.
- **How**: the "Submit your app for review" form (developer, contact email, app name, 200 to 500 word description, download link, NFR license yes/no). For a free app, answer No and say in the description that it is free.
- **Automation**: browser.

#### iOS Dev Weekly
- **Fit**: content for Apple-platform developers: send the technical blog post, not the app page.
- **How**: `suggest.iosdevweekly.com` (name, email, link, who wrote it, blog post yes/no, Swift library yes/no, why). Blogs in the iOS Dev Directory are read via RSS, so do not submit their posts by hand.
- **Automation**: browser.

#### Brett Terpstra
- **How**: email only, short and personal, written by the human.
- **Automation**: draft.

#### Skip
- **Daring Fireball**: the contact page is for feedback and corrections, not app pitches.
- **Swift Weekly Brief**: inactive; the last issue is from June 2022.

## Accounts to warm up

Several gates open only for accounts with history. Participate genuinely, without promoting, for a few weeks before the next launch:

| Account | Needed for |
|---|---|
| Reddit (u/alvaldesdev) | r/macapps main feed and comments, r/opensource |
| Hacker News (alvaldesdev) | Show HN |
| Indie Hackers | Posts |

Profile bios are part of the launch: visitors read them. Keep X, Threads, Medium and Hacker News bios current.

## Order of a launch

1. Asset kit, blog post, repo topics.
2. LinkedIn, X, Threads, Instagram (human-written, with the carousel).
3. Article cross-posts with the canonical URL: Medium, Dev.to, Hashnode.
4. Directories and lists: awesome lists, AlternativeTo, MacUpdate, Indie Goodies, Indie Hackers product page.
5. Communities, respecting each gate: r/macapps (megathread or main feed), Product Hunt (scheduled), Show HN.
6. Newsletters: AppAddict, iOS Dev Weekly.
7. Record every link and status in the launch's file under `docs/social/`.

## Toward skills

A first split that follows the automation levels above:

- **launch-kit**: builds the asset kit from the repo (descriptions, icon sizes, gallery images, cover images) and checks the canonical URL.
- **launch-cross-post**: publishes the blog post to Dev.to and Hashnode as drafts with tags, cover and canonical, and verifies them.
- **launch-lists**: opens the PRs for awesome-mac and open-source-mac-os-apps.
- **launch-directories**: fills AlternativeTo, MacUpdate, Indie Goodies, Indie Hackers, AppAddict and iOS Dev Weekly.
- **launch-community-drafts**: drafts the r/macapps PCP comment, the Show HN text and the Product Hunt fields, and checks each against the channel's current rules.
- **launch-tracker**: keeps the per-launch status table up to date.

Each skill stops before the final public action and asks.
