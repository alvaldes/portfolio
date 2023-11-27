import { supabase } from '../libs/initSupabase'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../libs/theme'
import Layout from '../components/layout/main'
import Fonts from '../components/fonts'
import { useRouter } from 'next/router'
import '../styles/globlal.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <ChakraProvider theme={theme} resetCSS>
        <Fonts />
        <Layout router={router}>
          <Component {...pageProps} key={router.router} />
        </Layout>
      </ChakraProvider>
    </SessionContextProvider>
  )
}

export default MyApp
