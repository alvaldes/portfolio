'use client'

import { Button } from '@heroui/react'
import SpainIcon from '../icons/SpainIcon'
import AmericanIcon from '../icons/AmericanIcon'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { i18n } from '@/i18n.config'

export default function LangSwitcher() {
  const pathName = usePathname()

  // The locale is always the first segment of a localised path, and `proxy.ts`
  // keeps BCP 47 spellings like `/en-US` out of the app, so comparing that one
  // segment against `i18n.locales` is enough to know which language is rendered.
  const [firstSegment = '', ...rest] = pathName.split('/').slice(1)
  const currentLocale = (i18n.locales as readonly string[]).includes(firstSegment)
    ? firstSegment
    : undefined
  const switchToEnglish = currentLocale !== undefined && currentLocale !== i18n.defaultLocale

  const redirectedPathName = (locale: string) => {
    // Without a locale in the path there is nothing to replace, so the target
    // language is prefixed instead.
    if (currentLocale === undefined) {
      return pathName === '/' || pathName === '' ? `/${locale}` : `/${locale}${pathName}`
    }
    return `/${[locale, ...rest].join('/')}`
  }

  if (switchToEnglish) {
    return (
      <Button as={Link} href={redirectedPathName('en')} isIconOnly className='bg-indigo-200 text-black p-1.5' size='sm' aria-label='English'>
        <AmericanIcon/>
      </Button>
  )
  } else {
    return (
      <Button as={Link} href={redirectedPathName('es')} isIconOnly className='bg-amber-600 text-white p-1.5' size='sm' aria-label='Español'>
        <SpainIcon/>
      </Button>
  )
  }
}