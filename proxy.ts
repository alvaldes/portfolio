import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from '@/i18n.config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

    // Filter out invalid locale codes that matchLocale can't handle
    const validLanguages = languages.filter(lang => {
        try {
            Intl.getCanonicalLocales(lang)
            return true
        } catch {
            return false
        }
    })

    if (validLanguages.length === 0) {
        return i18n.defaultLocale
    }

    const locale = matchLocale(validLanguages, locales, i18n.defaultLocale)
    return locale
}

function isLocale(segment: string | undefined): boolean {
    return segment !== undefined && (i18n.locales as readonly string[]).includes(segment)
}

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // The BCP 47 spellings `/en-US` and `/es-ES` were the canonical routes before
    // the app moved to the short codes, so they keep working as permanent
    // redirects. `matchLocale` still negotiates from tags like `en-US`, but in a
    // path the region suffix is not a locale: without this, `/en-US/works` reads
    // as un-localised and gets prefixed into `/es/en-US/works`, which is a 404.
    const regionalLocale = pathname.match(/^\/([a-z]{2})-[a-z]{2}(?=\/|$)/i)
    if (regionalLocale && isLocale(regionalLocale[1].toLowerCase())) {
        const url = request.nextUrl.clone()
        url.pathname = pathname.replace(regionalLocale[0], `/${regionalLocale[1].toLowerCase()}`)
        return NextResponse.redirect(url, 308)
    }

    // A path whose first segment is already a canonical locale needs no redirect.
    if (isLocale(pathname.split('/')[1])) {
        return
    }

    const locale = getLocale(request) ?? i18n.defaultLocale

    const url = request.nextUrl.clone()
    url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`

    return NextResponse.redirect(url)
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next|images|favicon.ico).*)']
}
