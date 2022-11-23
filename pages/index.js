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

const Page = () => {
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
            Hello, I&apos; m a Software Engineer base in Cuba!
          </Box>
          <Box display={{ md: 'flex' }}>
            <Box flexGrow={1} mt={{ base: 0, md: 10 }}>
              <Heading as="h1" size="lg" variant="page-title">
                Angel L. Valdés
              </Heading>
              <p>Web Developer (Front-end / Back-end / Design)</p>
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
            Work
          </Heading>
          <Paragraph>
            Angel is a newly graduated computer engineer offering enthusiasm and
            innovative ideas. Demonstrated experience in web programming and
            passionate about dynamic interfaces and clean code. Experienced
            working with teams to produce impactful, leading-edge websites that
            engage customers and deliver business results. Well-versed in design
            standards and user preferences. Background includes responsive
            designing websites in Agile environments. Exceptional team player
            with an analytical approach to developing useful solutions.
            Currently, proyect called{' '}
            <NextLink href="/works/trivial">
              <Link>Trivial</Link>
            </NextLink>
            .
          </Paragraph>
          <Box align="center" my={4}>
            <NextLink href="/works">
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                My Portfolio
              </Button>
            </NextLink>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title" mt={10}>
            Bio
          </Heading>
          <BioSection>
            <BioYear>1997</BioYear>
            Born in Havana, Cuba.
          </BioSection>
          <BioSection>
            <BioYear>2021</BioYear>
            Completed the degree in Computer Engineering at Universidad de las
            Ciencias Informáticas (UCI).
          </BioSection>
          <BioSection>
            <BioYear>2022 to present</BioYear>
            Works as a Front-end dev at Universidad Tecnológica de La Habana
            "José Antonio Echeverría" (CUJAE).
          </BioSection>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title" mt={10}>
            I{useColorModeValue('🖤', '🤍')}
          </Heading>
          <Paragraph>
            Photography, Design, Swim, Dancing, Karaoke and Coffee
          </Paragraph>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title" mt={10}>
            My Links
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
