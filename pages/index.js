import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Image,
  Link,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Banner from '../components/banner'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layout/article'
import Paragraph from '../components/paragraph'
import Section from '../components/section'
import { useTranslation } from '../libs/i18n';

const Page = () => {
  const {t} = useTranslation();
  return (
    <Layout>
      <Container maxW="container.md">
        <Section delay={0.1}>
          <Banner />
          <Box
            borderRadius="0.5em"
            bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
            p={3}
            mb={{ base: 8, md: 14 }}
            align="center"
            maxW="3xl"
          >
            {t.home.banner}
          </Box>
          <Box display={{ md: 'flex' }}>
            <Box flexGrow={1} mt={{ base: 0, md: 10 }}>
              <Heading as="h1" size="lg" variant="page-title">
                Angel L. Valdés
              </Heading>
              <p>{t.home.skills}</p>
            </Box>
            <Box
              flexShrink={0}
              mt={{ base: -4, md: -10 }}
              ml={{ base: -10, md: 0 }}
              align="center"
            >
              <Image
                src="/images/blob.svg"
                maxWidth="300px"
                display="inline-block"
                alt="blob"
                sx={{ position: 'absolute', zIndex: -1 }}
              />
              <Image
                borderColor="teal.300"
                borderWidth={4}
                borderStyle="solid"
                maxWidth="220px"
                display="inline-block"
                borderRadius="full"
                mt={10}
                ml={10}
                src="/images/angel.png"
                alt="Angel Profile Image"
              />
            </Box>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title" mt={14}>
            {t.home['work-title']}
          </Heading>
          <Paragraph>
            {t.home['work-descip']}{' '}
            <NextLink href={'/works/'+t.home['current-link']}>
              <Link>{t.home['current-name']}</Link>
            </NextLink>
            .
          </Paragraph>
          <Box align="center" my={4}>
            <NextLink href="/works">
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                {t.home['my-portfolio']}
              </Button>
            </NextLink>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title" mt={10}>
          {t.home.bio.bio}
          </Heading>
          <BioSection>
            <BioYear>1997</BioYear>
            {t.home.bio['1997']}
          </BioSection>
          <BioSection>
            <BioYear>2021</BioYear>
            {t.home.bio['2021']}
          </BioSection>
          <BioSection>
            <BioYear>{`2022 ${t.home.bio['to-present']}`}</BioYear>
            {t.home.bio['2022']}
          </BioSection>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title" mt={10}>
            {t.home.love.love}{useColorModeValue('🖤', '🤍')}
          </Heading>
          <Paragraph>
            {t.home.love.list}
          </Paragraph>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title" mt={10}>
            {t.home['my-links']}
          </Heading>
          <List>
            <ListItem>
              <Link href="http://www.twitter.com/alvaldes_" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={FaTwitter} />}
                >
                  @alvaldes_
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="http://www.github.com/alvaldes" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={FaGithub} />}
                >
                  @alvaldes
                </Button>
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.linkedin.com/in/alvaldes/"
                target="_blank"
              >
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={FaLinkedin} />}
                >
                  @alvaldes
                </Button>
              </Link>
            </ListItem>
          </List>
        </Section>
      </Container>
    </Layout>
  )
}

export default Page
