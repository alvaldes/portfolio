import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Badge, Container, Image, Link, List, ListItem } from '@chakra-ui/react'
import { useState } from 'react'
import BlackOverlay from '../../components/blackOverlay'
import Layout from '../../components/layout/article'
import P from '../../components/paragraph'
import { Meta, Title, WorkFirstImage, WorkImage } from '../../components/work'

const Work = () => {
  const [isViewer, setIsViewer] = useState(false)

  return (
    <Layout title="Trivial">
      <Container maxW="container.md">
        <WorkFirstImage src="/images/trivial/thumbFirst.jpeg" alt="Trivial" />
        <Title>
          Trivial <Badge>2022</Badge>
        </Title>
        <P>
          <strong>Trivial</strong> is a type of game in which players are asked
          questions about different topics and they have to get as many correct
          answers as possible. Besides having the benefit of improving and
          expanding your knowledge, either general or in more specific areas,
          this style of game is designed so that the contestants have fun
          playing, and its main objective is to create discussion and healthy
          debate among participants. In fact it is not mandatory that Trivia
          winners have to get a prize and almost everyone is ok with that as
          their main objective is to have fun and learn at the same time. Trivia
          questions and answers can be adapted to any audience and can be used
          in schools and universities to assist in language skills development
          and to test knowledge and skills levels.
        </P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://trivial.alvaldes.vercel.app">
              trivial.alvaldes.vercel.app <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Souce Code</Meta>
            <Link href="https://github.com/alvaldes/Trivial">
              github.com/alvaldes/Trivial <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Web</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>JavaScript, Node.JS, React.JS, Next.JS, Chackra-UI</span>
          </ListItem>
        </List>

        <WorkImage
          src="/images/trivial/thumbMockup.png"
          alt="Trivial_Mockup"
          w="full"
          mt={10}
          onClick={() => setIsViewer(true)}
        />
      </Container>
      <BlackOverlay open={isViewer} close={() => setIsViewer(false)}>
        <Image
          src="/images/trivial/thumbMockup.png"
          alt="Trivial_Mockup"
          height="80vh"
          sx={{ objectFit: 'contain' }}
        />
      </BlackOverlay>
    </Layout>
  )
}

export default Work
