import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import LanguageToggleButton from './language-toggle-button'
import { FaGithub } from 'react-icons/fa'
import { useTranslation } from '../libs/i18n'

const LinkItem = ({ href, path, externalLink, children }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  if (externalLink) {
    return (
      <Link
        href={href}
        p={2}
        bg={active ? 'glassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
      >
        {children}
      </Link>
    )
  }
  return (
    <NextLink href={href}>
      <Link
        p={2}
        bg={active ? 'glassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const Navbar = props => {
  const { path } = props
  const {t} = useTranslation();

  return (
    <Box
      position="fixed"
      as="navbar"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      style={{ backdropFilter: 'blur(10px)' }}
      sx={{ zIndex: 2 }}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.lg"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/works" path={path}>
            {t.nav.works}
          </LinkItem>
          <LinkItem href="/#contact" path={path}>
            {t.nav.contact}
          </LinkItem>
          {/* <LinkItem href="/posts" path={path}>
            Posts
          </LinkItem> */}
          <LinkItem
            href="https://github.com/alvaldes/portfolio"
            path={path}
            externalLink
          >
            <Icon as={FaGithub} w={3.5} h={3.5} /> {t.nav.source}
          </LinkItem>
        </Stack>

        <Box flex={1} align="right">
          <ThemeToggleButton/>
          <LanguageToggleButton />
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="/works" passHref>
                  <MenuItem as={Link}>{t.nav.works}</MenuItem>
                </NextLink>

                <NextLink href="/#contact" passHref>
                  <MenuItem as={Link}>{t.nav.contact}</MenuItem>
                </NextLink>
                {/* <NextLink href="/posts" passHref>
                  <MenuItem as={Link}>Posts</MenuItem>
                </NextLink> */}
                <MenuItem as={Link} href="https://github.com/alvaldes/portfolio">
                  {t.nav['view-source']}
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
