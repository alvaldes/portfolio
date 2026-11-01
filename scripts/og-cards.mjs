// Renders the default 1200x630 social card for each language into public/og/.
//
// Usage: bun run og [light|dark] [outDir]
// Needs Playwright's headless Chromium once: bunx playwright install chromium-headless-shell
//
// Name, role and years come from the locale files; the stack and tagline lines
// are below. Colors and fonts mirror src/styles/global.css.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("..", import.meta.url));
const theme = process.argv[2] ?? "dark";
const outDir = resolve(root, process.argv[3] ?? "public/og");

const THEMES = {
	light: {
		background: "#f0e7bd",
		foreground: "#202023",
		primary: "#3f4f8d",
		primaryForeground: "#f0e7bd",
		secondary: "#a1455c",
		logo: "logoSVG.svg",
	},
	dark: {
		background: "#121212",
		foreground: "#ecedee",
		primary: "#dca3b6",
		primaryForeground: "#202020",
		secondary: "#818cda",
		logo: "logoSVG-dark.svg",
	},
};

const LINES = {
	es: { stack: "Angular · React · Spring Boot", tagline: "Full-stack: frontend, backend y bases de datos" },
	en: { stack: "Angular · React · Spring Boot", tagline: "Full-stack: frontend, backend and databases" },
};

const colors = THEMES[theme];
if (!colors) throw new Error(`Unknown theme "${theme}". Use one of: ${Object.keys(THEMES).join(", ")}`);

const file = (path) => pathToFileURL(resolve(root, path)).href;
// First frame of the animated blob behind the portrait on the home page.
const blob = readFileSync(resolve(root, "src/assets/images/blob.svg"), "utf8").match(/values="([^;"]+)/)[1];
const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function card(lang) {
	const locale = JSON.parse(readFileSync(resolve(root, `src/i18n/locales/${lang}.json`), "utf8"));
	const { stack, tagline } = LINES[lang];
	const domain = new URL(readFileSync(resolve(root, "astro.config.mjs"), "utf8").match(/site:\s*['"]([^'"]+)/)[1]).hostname.replace(/^www\./, "");

	return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8">
<style>
@font-face{font-family:"MPR";src:url("${file("public/fonts/m-plus-rounded-1c-latin-400.woff2")}");font-weight:400}
@font-face{font-family:"MPR";src:url("${file("public/fonts/m-plus-rounded-1c-latin-500.woff2")}");font-weight:500}
@font-face{font-family:"MPR";src:url("${file("public/fonts/m-plus-rounded-1c-latin-700.woff2")}");font-weight:700}
@font-face{font-family:"Comfortaa";src:url("${file("public/fonts/comfortaa-latin-700.woff2")}");font-weight:700}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden}
body{background:${colors.background};color:${colors.foreground};font-family:"MPR",sans-serif;position:relative}
.glow{position:absolute;inset:0;background:radial-gradient(circle at 78% 50%,color-mix(in srgb,${colors.primary} 14%,transparent),transparent 55%)}
.text{position:absolute;left:84px;top:0;bottom:0;width:640px;display:flex;flex-direction:column;justify-content:center}
.brand{display:flex;align-items:center;gap:14px;font-weight:700;font-size:26px;margin-bottom:34px}
.brand img{width:30px;height:36px}
h1{font-weight:700;font-size:74px;line-height:1.05;letter-spacing:-1px}
.row{display:flex;align-items:flex-start;gap:12px}
.role{margin-top:26px;font-family:"Comfortaa",sans-serif;font-weight:700;font-size:44px;color:${colors.primary}}
.badge{margin-top:14px;background:${colors.secondary};color:${colors.primaryForeground};font-weight:700;font-size:17px;padding:4px 10px;border-radius:10px;box-shadow:0 6px 16px color-mix(in srgb,${colors.secondary} 40%,transparent);white-space:nowrap}
.stack{margin-top:16px;font-size:30px;font-weight:500}
.tagline{margin-top:8px;font-size:23px;opacity:.7}
.photo{position:absolute;right:110px;top:50%;width:340px;height:340px;transform:translateY(-50%)}
.photo svg{position:absolute;left:-25%;top:-25%;width:150%;height:150%;color:${colors.primary};filter:blur(1px)}
.photo img{position:relative;width:100%;height:100%;border-radius:50%;border:4px solid ${colors.primary};object-fit:cover}
</style></head><body>
<div class="glow"></div>
<div class="text">
	<div class="brand"><img src="${file(`public/images/${colors.logo}`)}" alt="">${escape(domain)}</div>
	<h1>${escape(locale.home.name)}</h1>
	<div class="row"><div class="role">${escape(locale.site.jobTitle)}</div><span class="badge">${escape(locale.home.experience)}</span></div>
	<div class="stack">${escape(stack)}</div>
	<div class="tagline">${escape(tagline)}</div>
</div>
<div class="photo">
	<svg viewBox="0 0 500 500" aria-hidden="true"><g transform="rotate(84 250 250)"><path fill="currentColor" d="${blob}"/></g></svg>
	<img src="${file("src/assets/images/angel.webp")}" alt="">
</div>
</body></html>`;
}

await mkdir(outDir, { recursive: true });
const scratch = mkdtempSync(join(tmpdir(), "og-cards-"));
const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
try {
	const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
	for (const lang of Object.keys(LINES)) {
		// Loaded from a file:// URL so the page may read the local fonts and images.
		const html = join(scratch, `card-${lang}.html`);
		writeFileSync(html, card(lang));
		await page.goto(pathToFileURL(html).href, { waitUntil: "load" });
		await page.evaluate(() => document.fonts.ready);
		const path = resolve(outDir, `default-${lang}.jpg`);
		await page.screenshot({ path, type: "jpeg", quality: 88 });
		console.log(`${theme} card written to ${path}`);
	}
} finally {
	await browser.close();
	rmSync(scratch, { recursive: true, force: true });
}
