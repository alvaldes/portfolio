import 'server-only'
import type { Locale } from '@/i18n.config'

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then(module => module.default),
    es: () => import('@/dictionaries/es.json').then(module => module.default)
} as const

function getShortLocale(locale: Locale): 'en' | 'es' {
    return locale.split('-')[0].toLowerCase() as 'en' | 'es'
}

export const getDictionary = async (locale: Locale) => dictionaries[getShortLocale(locale)]()