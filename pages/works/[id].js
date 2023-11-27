import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Badge, Container, Image, Link, List, ListItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import BlackOverlay from '../../components/blackOverlay'
import Layout from '../../components/layout/article'
import { Meta, Title, WorkFirstImage, WorkImage } from '../../components/work'
import {marked} from 'marked'
import { useTranslation } from '../../libs/i18n'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const Work = ({id,...props}) => {
  const [isViewer, setIsViewer] = useState(false)
  const {locale} = useTranslation();
  const supabase = useSupabaseClient()
  const [work, setWork] = useState()
  
  useEffect(() => {
    const fetchWork = async () => {
      const { data, error } = await supabase
        .from('work')
        .select('*')
        .eq('url', id)
        .eq('languageCode', locale)

      if (error) console.log('error', error)//TODO: create an alert or a retry btn or something
      else setWork(data[0])
    }

    fetchWork()
  }, [supabase, locale])
  
  return (
    <Layout title={work?.name}>
      {work!==undefined && (//TODO: add loading
        <Container maxW="container.md">
          <WorkFirstImage src={work?.thumbFirst} alt={work?.name+"_Banner"} />
          <Title>
            {work?.name} <Badge>{work?.year}</Badge>
          </Title>
          <div dangerouslySetInnerHTML={{ __html: marked(work?.longDescription ? work?.longDescription : '') }} />
          <List ml={4} my={4}>
            <ListItem>
              <Meta>Website</Meta>
              <Link href={work?.websiteLink}>
                {work?.websiteName} <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
            <ListItem>
              <Meta>Souce Code</Meta>
              <Link href={work?.sourceLink}>
                {work?.sourceName} <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
            <ListItem>
              <Meta>Platform</Meta>
              <span>{work?.platform}</span>
            </ListItem>
            <ListItem>
              <Meta>Stack</Meta>
              <span>{work?.stack}</span>
            </ListItem>
          </List>

          <WorkImage
            src={work?.thumbMockup}
            alt="mockup"
            w="full"
            mt={10}
            onClick={() => setIsViewer(true)}
          />
        </Container>
      )}
        <BlackOverlay open={isViewer} close={() => setIsViewer(false)}>
          <Image
            src={work?.thumbMockup}
            alt="mock_preview"
            height="80vh"
            sx={{ objectFit: 'contain' }}
          />
        </BlackOverlay>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
}

export default Work
