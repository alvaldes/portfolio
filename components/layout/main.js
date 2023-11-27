import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import Navbar from '../navbar.js'
import CommentForm from '../commentForm.js'
import { useTranslation } from '../../libs/i18n.js'

const Main = ({ children, router }) => {
  const d = new Date()
  const year = d.getFullYear()

  const {t} = useTranslation();

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Software Engineer with skills in web development and clean code"
        />
        <meta
          name="keywords"
          content="Angel, Valdés, alvaldes, software, code, programming, development, web,"
        />
        <meta charSet="utf-8" />
        <meta name="author" content="Angel L. Valdés" />
        <title>Angel Valdés</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.lg" pt={14}>
        {children}
      </Container>
      <Container align="center" maxW="container.md">
        <CommentForm id="contact" />
        <Box as="span" color="gray.500">
          &copy; {year} Angel Valdés. {t['copy-right']}
        </Box>
      </Container>
    </Box>
  )
}

export default Main
