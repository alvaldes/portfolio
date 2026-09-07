import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import { Locale, i18n } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { mPlus, comfortaa } from '../fonts'
import GoToTop from './components/GoToTop'
import Footer from './components/Footer'
import Navbar from './components/Nav/Navbar'


export const metadata: Metadata = {
  title: 'Angel L. Valdés',
  description: 'Software engineer with +3 years of web development expertise',
  openGraph: {
    title: 'Angel L. Valdés',
    description: 'Software engineer with +3 years of web development expertise',
    url: 'https://alvaldes.vercel.app/en',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/adae5c0f-24ed-45c9-94ef-cf1dec6897d9.jpg?token=gKMZjffLBm8eStM3klyO82lZaVCGSx25d7csxbOryk4&height=630&width=1200&expires=33273733483',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image", 
    site: "@site", 
    creator: "@creator", 
    images: 'https://opengraph.b-cdn.net/production/images/adae5c0f-24ed-45c9-94ef-cf1dec6897d9.jpg?token=gKMZjffLBm8eStM3klyO82lZaVCGSx25d7csxbOryk4&height=630&width=1200&expires=33273733483',
  },
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params
}: {
  readonly children: React.ReactNode
  readonly params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const { nav, footer, home } = await getDictionary(lang as Locale)

  return (
    <html lang={lang as Locale} className={`${mPlus.variable} ${comfortaa.variable} font-mplus`} suppressHydrationWarning>
      <body className={`text-foreground container`}>
        <div className="fixed left-0 top-0 -z-10 h-full w-full"><div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full dark:bg-amber-500 bg-rose-900 dark:opacity-20 opacity-40 blur-[100px]"></div></div></div>
        <Providers>
          <header className='lg:max-w-[75%]'>
            <Navbar lang={lang as Locale} dictionary={nav} />
          </header>
          <main className='text-foreground mt-20 w-full lg:max-w-[75%] mx-auto'>
            {children}
            <GoToTop />
          </main>
          <Footer lang={lang as Locale} dictionary={{ nav, footer, home }} />
        </Providers>
      </body>
    </html>
  )
}

