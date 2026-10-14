// The short codes are the canonical routes: `/en` and `/es`. They are what
// `proxy.ts` negotiates, what every link in the app builds and what the locale
// switch compares against. The BCP 47 spellings `/en-US` and `/es-ES` used to be
// canonical, so `proxy.ts` still answers them with a permanent redirect.
export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'es']
  } as const
  
  export type Locale = (typeof i18n)['locales'][number]