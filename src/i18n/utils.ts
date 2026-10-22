import { getRelativeLocaleUrl } from "astro:i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";

export const LANGUAGES = {
	es: "Español",
	en: "English",
} as const;

export type UiType = keyof typeof LANGUAGES;

export const DEFAULT_LANG: UiType = "es";

const ui = { es, en };

// Dot-separated path to every string in the dictionary, e.g. "home.bio.bio".
type Leaves<T> = {
	[K in keyof T & string]: T[K] extends string ? K : `${K}.${Leaves<T[K]>}`;
}[keyof T & string];

export type TranslationKey = Leaves<typeof es>;

export function isLanguage(value: string | undefined): value is UiType {
	return value !== undefined && value in LANGUAGES;
}

export function getLangFromUrl(url: URL): UiType {
	const [, segment] = url.pathname.split("/");
	return isLanguage(segment) ? segment : DEFAULT_LANG;
}

function lookup(dictionary: unknown, key: string): string | undefined {
	const value = key
		.split(".")
		.reduce<unknown>(
			(node, part) =>
				node && typeof node === "object" ? (node as Record<string, unknown>)[part] : undefined,
			dictionary,
		);
	return typeof value === "string" ? value : undefined;
}

export function useTranslations(lang: UiType) {
	return function t(key: TranslationKey): string {
		return lookup(ui[lang], key) ?? lookup(ui[DEFAULT_LANG], key) ?? key;
	};
}

// Structured content (lists, nested objects) that `t()` cannot return as a string.
export function getDictionary(lang: UiType) {
	return ui[lang];
}

export function pathNameIsInLanguage(pathname: string, lang: UiType): boolean {
	return getLangFromUrl(new URL(pathname, "http://localhost")) === lang;
}

// Drops any locale prefix from the pathname and rebuilds it for the target language.
export function getLocalizedPathname(pathname: string, lang: UiType): string {
	const segments = pathname.split("/").filter(Boolean);
	if (isLanguage(segments[0])) segments.shift();
	return getRelativeLocaleUrl(lang, segments.join("/"));
}
