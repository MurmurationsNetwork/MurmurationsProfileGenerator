import { Flex, Heading, Image, Link, Stack, useBreakpointValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const Navbar = dynamic(() => import('./Navbar'), { ssr: false })

export default function AppShell({ children }) {
  const screenSize = useBreakpointValue({
    lg: 'desktop'
  })

  return (
    <Flex
      flexDirection="column"
      width="100%"
      maxWidth="75rem"
      mx="auto"
      bg="white"
      fontSize={{ base: 'md', md: 'lg' }}
    >
      <Navbar screenSize={screenSize} />

      {children}

      {/* 
        F O O T E R  -  S t a r t
        */}
      <Flex backgroundColor="gray.50" px={[4, 8, 16, 0]} width="100%" maxWidth="75rem">
        <Flex mx="auto" width="100%" maxWidth="75rem" flexDirection="column">
          <Heading
            textAlign="center"
            mt={{ base: 6, md: 12 }}
            mb={{ base: 4, md: 9 }}
            textStyle="h4"
            color="gray.800"
          >
            Murmurations Network
          </Heading>
          <Stack
            spacing={[8, 12, 16, 24]}
            isInline
            justifyContent="center"
            alignItems="stretch"
            fontSize={{ base: '90%', md: '80%' }}
          >
            <Link color="gray.500" isExternal href="https://murmurations.network">
              Home Site
            </Link>
            <Link color="gray.500" isExternal href="https://murmurations.network/principles/">
              Principles
            </Link>
            <Link color="gray.500" isExternal href="https://murmurations.network/faq/">
              FAQ
            </Link>
          </Stack>
          <Flex mx="auto" my={{ base: 2, md: 6 }}>
            <Link isExternal href="https://github.com/MurmurationsNetwork/MurmurationsProtocol">
              <Image
                height={['15px', null, '20px']}
                width={['15px', null, '20px']}
                src="github-gray.svg"
                alt="GitHub"
              />
            </Link>
          </Flex>
        </Flex>
      </Flex>
      {/* 
        F O O T E R  -  E n d
        */}
    </Flex>
  )
}
