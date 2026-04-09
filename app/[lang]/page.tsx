import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Badge, Button, Divider, Link } from '@heroui/react'
import { ChevronDoubleRightIcon } from '@heroicons/react/16/solid'
import ResponsiveTimeline from './components/TimeLine/ResponsiveTimeline'
import Socials from './components/Socials'
import Image from 'next/image'
import SectionTransition from './components/SectionTransition'
import EarthCanvas from './components/EarthCanvas'
import StartCanvas from './components/StarsCanvas'

export default async function Home({
  params
}: Readonly<{
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  const { home } = await getDictionary(lang as Locale)
  return (
      <article className='flex flex-col mx-auto'>
        <SectionTransition delay={0.2} id='banner' className='flex flex-col gap-4 mt-3'>
          <div className='h-64 sm:h-unit-72 lg:h-96'>
            <EarthCanvas/>
            <StartCanvas/>
          </div>

          <span className='py-3 px-11 text-center dark:bg-white/10 bg-black/5 rounded-md font-comfortaa font-black'>{home.banner}</span>

          <div className='grid-template py-2 mt-6'>
            <div className='flex flex-col self-start gap-1 items-start justify-start mt-8 md:mt-12 lg:mt-14 grid-info'>
              <h1 className='mb-2 text-2xl md:text-3xl font-semibold'>{home.name}</h1>
              <Badge content={home.experience} color="warning" variant="solid" placement="top-right" shape="rectangle" showOutline={false} className='text-xs sm:text-sm'>
                <h2 className='text-sm sm:text-lg pr-0 pt-2 sm:pr-14 sm:pt-0'>{home.description}</h2>
              </Badge>
            </div>
            <div className='flex items-center justify-center sm:justify-start sm:items-start grid-socials sm:mt-4'>
              <Socials withEmail cv_url={home.cv_url}/>
            </div>
            <div className='flex flex-shrink-0 justify-center grid-portrait'>
              <Image 
                src='/images/blob.svg' 
                alt='blob' 
                className='absolute -z-0 size-36 md:size-60 brightness-50 contrast-125 hue-rotate-15 dark:brightness-50 dark:contrast-100 dark:hue-rotate-0' 
                width={200} height={200}/>
              <Image 
                src='/images/angel.webp' 
                alt='angel' 
                className='rounded-full z-10 mt-4 sm:mt-4 md:mt-9 ml-0 border-teal-800 dark:border-teal-600 border-2 size-28 md:size-40' 
                width={130} height={130}/>
            </div>
          </div>
        </SectionTransition>
        <SectionTransition delay={0.3} id='bio' className="flex flex-col  gap-4 mt-8 md:mt-0">
          <h1 className='text-2xl font-bold'>{home.bio}</h1>
          <Divider className="my-0" />
          <p>
            {home.resume}
            <Link href={home.currentProject.url} color="secondary" underline='hover' className='font-medium'>
              {home.currentProject.label}
            </Link>.
          </p>
          <div className='flex justify-center'>
            <Button
              href="/works"
              as={Link}
              color="primary"
              showAnchorIcon
              variant="solid"
              className='text-lg font-bold py-4 px-8'
              anchorIcon={<ChevronDoubleRightIcon width={16} height={16}/>}
            >
              Portfolio
            </Button>
          </div>
          
        </SectionTransition>
        <SectionTransition delay={0.4} id='timeline' className=''>
          <ResponsiveTimeline data={home.timeline}/>
        </SectionTransition>
      </article>
  )
}
