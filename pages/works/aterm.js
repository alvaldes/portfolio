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
    <Layout title="aterm">
      <Container maxW="container.md">
        <WorkFirstImage src="/images/aterm/thumbFirst.png" alt="aterm_Banner" />
        <Title>
          aterm <Badge>2022</Badge>
        </Title>
        <P>
          <strong>Aterm</strong> is a static website or portfolio, that looks
          like a terminal. But it’s much better if someone that visits the web
          page, can actually type some commands and get the output like in a
          real styled terminal. You can call it Fake Terminal because it will
          not give you what a real shell-like SSH gives you.
        </P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href="https://aterm.netlify.app">
              aterm.netlify.app <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Souce Code</Meta>
            <Link href="https://github.com/alvaldes/aterm">
              github.com/alvaldes/aterm <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Web</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>HTML, CSS, JavaScript</span>
          </ListItem>
        </List>

        <WorkImage
          src="/images/aterm/thumbMockup.png"
          alt="aterm_Mockup"
          w="full"
          mt={10}
          onClick={() => setIsViewer(true)}
        />
      </Container>
      <BlackOverlay open={isViewer} close={() => setIsViewer(false)}>
        <Image
          src="/images/aterm/thumbMockup.png"
          alt="aterm_Mockup"
          height="80vh"
          sx={{ objectFit: 'contain' }}
        />
      </BlackOverlay>
    </Layout>
  )
}

export default Work
