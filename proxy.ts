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

// Extract short locale code (e.g., 'en' from 'en-US') for URL paths
function getShortLocale(locale: string): string {
    return locale.split('-')[0].toLowerCase()
}

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Check if the pathname already has a valid locale (short codes)
    const shortLocales = i18n.locales.map(getShortLocale)
    const hasValidLocale = shortLocales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    // If the pathname doesn't have a valid locale, add the default prefix
    if (!hasValidLocale) {
        const locale = getLocale(request) ?? i18n.defaultLocale
        const shortLocale = getShortLocale(locale)

        return NextResponse.redirect(
        new URL(
            `/${shortLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
            request.url
        )
        )
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next|images|favicon.ico).*)']
}