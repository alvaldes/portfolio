import { AnimatePresence, motion } from 'framer-motion'
import { IconButton } from '@chakra-ui/react'
import Flag from 'react-flagkit';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';

const flagNames = {
  "spanish": "ES",
  "english": "US"
}

const LanguageToggleButton = () => {
  const router = useRouter()
  const { pathname, asPath, query, locale } = router
  const [lang, setLang] = useState(flagNames.spanish)

  const changeLaguage = () => {
    let isSpanish = lang == flagNames.spanish
    router.push({ pathname, query }, asPath, { locale: isSpanish?'es':'en' })
    setLang(isSpanish ? flagNames.english : flagNames.spanish)
  }

  useEffect(() => {
      setLang(locale==='en'? flagNames.spanish : flagNames.english)
  }, [])
  

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        ml='9'
        style={{ display: 'inline-block' }}
        key={lang}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ opacity: 0.2 }}
      >
        <IconButton
          ml='2'
          aria-label="Toggle langauge"
          variant='outline'
          colorScheme={lang=="ES"?"yellow":'cyan'}
          icon={<Flag country={lang} />}
          onClick={changeLaguage}
        ></IconButton>
      </motion.div>
    </AnimatePresence>
  )
}

export default LanguageToggleButton
