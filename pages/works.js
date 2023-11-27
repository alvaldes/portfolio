import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import { WorkGridItem } from '../components/grid-item'
import Layout from '../components/layout/article'
import Section from '../components/section'

import { useTranslation } from '../libs/i18n'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

const Works = () => {
  const {t,locale} = useTranslation();
  const supabase = useSupabaseClient()
  const [works, setWorks] = useState([])

  useEffect(() => {
    const fetchWorks = async () => {
      const { data, error } = await supabase
        .from('work')
        .select('*')
        .eq('languageCode', locale)
        .order('id', { ascending: true })

      if (error) console.log('error', error)//TODO: create an alert or a retry btn or something
      else setWorks(data)
    }

    fetchWorks()
  }, [supabase, locale])

  return (
    <Layout title={t.nav.works}>
      <Container maxW="container.md">
        <Heading as="h3" fontSize={20} mb={4} mt={5}>
          {t.works.personal}
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
        {works.map((work) => (
          <Section key={work.id}>
            <WorkGridItem id={work.url} title={work.name} thumbnail={work.thumbCard}>
              {work.shortDescription}
            </WorkGridItem>
          </Section>
        ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default Works
