import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import NextLink from 'next/link'
import Router from 'next/router'

import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'

export default function AppShell({ children }) {
  const { signinWithGithub, signinWithGoogle, signout, user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { resetProfile } = useProfile()
  const screenSize = useBreakpointValue({
    lg: 'desktop'
  })

  function handleNewProfile() {
    resetProfile()
    Router.push('/profile')
  }

  function handleSignIn() {
    onOpen()
  }

  function signinGithub() {
    signinWithGithub()
    onClose()
  }

  function signinGoogle() {
    signinWithGoogle()
    onClose()
  }

  return (
    <Flex bg="gray.100">
      <Flex
        flexDirection="column"
        width="100%"
        maxWidth="75rem"
        mx="auto"
        bg="white"
        fontSize={{ base: 'md', md: 'lg' }}
      >
        {/* 
        N A V B A R  -  S t a r t
        */}
        <Flex
          display="flex"
          flexDirection="row"
          backgroundColor="gray.50"
          justifyContent={{ base: 'space-between', lg: 'space-around' }}
          alignItems="center"
          px={{ base: 8, md: 16 }}
          py={{ base: 1, md: 4 }}
        >
          <Flex mx={0} my={{ base: 4, md: 0 }}>
            <NextLink href="/">
              <Image
                height={['38px', '57px', '77px']}
                width={['50px', '75px', '100px']}
                src="murmurations-logo.png"
                alt="Murmurations"
                _active={{
                  transform: 'scale(0.95)'
                }}
              />
            </NextLink>
          </Flex>
          {screenSize === 'desktop' ? (
            <Stack spacing={[8, 12, 16, 24]} isInline alignItems="center" mb={{ base: 2, md: 0 }}>
              <Link color="gray.500" href={process.env.NEXT_PUBLIC_MURMURATIONS_AGGREGATOR_URL}>
                Map
              </Link>
              {user ? (
                <NextLink href="/dashboard">
                  <Link
                    color="gray.500"
                    _active={{
                      transform: 'scale(0.95)'
                    }}
                  >
                    Dashboard
                  </Link>
                </NextLink>
              ) : (
                <NextLink href="/protools">
                  <Link
                    color="gray.500"
                    _active={{
                      transform: 'scale(0.95)'
                    }}
                  >
                    Pro Tools
                  </Link>
                </NextLink>
              )}
              {user ? (
                // eslint-disable-next-line
                <Link
                  color="gray.500"
                  _active={{
                    transform: 'scale(0.95)'
                  }}
                  onClick={() => signout()}
                >
                  Sign Out
                </Link>
              ) : (
                // eslint-disable-next-line
                <Link
                  color="gray.500"
                  _active={{
                    transform: 'scale(0.95)'
                  }}
                  onClick={() => handleSignIn()}
                >
                  Sign In
                </Link>
              )}
              <Button
                variant="solid"
                size="md"
                fontSize={{ base: 'md', md: 'lg' }}
                colorScheme="red"
                borderRadius="25px"
                height={[6, 7, 8, 10]}
                _active={{
                  transform: 'scale(0.95)'
                }}
                onClick={() => handleNewProfile()}
              >
                New Profile
              </Button>
            </Stack>
          ) : (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                size="md"
                variant="outline"
              />
              <MenuList>
                <MenuItem>
                  <Link color="gray.500" href={process.env.NEXT_PUBLIC_MURMURATIONS_AGGREGATOR_URL}>
                    Map
                  </Link>
                </MenuItem>
                <MenuItem>
                  {user ? (
                    <NextLink href="/dashboard">
                      <Link
                        color="gray.500"
                        _active={{
                          transform: 'scale(0.95)'
                        }}
                      >
                        Dashboard
                      </Link>
                    </NextLink>
                  ) : (
                    <NextLink href="/protools">
                      <Link
                        color="gray.500"
                        _active={{
                          transform: 'scale(0.95)'
                        }}
                      >
                        Pro Tools
                      </Link>
                    </NextLink>
                  )}
                </MenuItem>
                <MenuItem>
                  {user ? (
                    // eslint-disable-next-line
                    <Link
                      color="gray.500"
                      _active={{
                        transform: 'scale(0.95)'
                      }}
                      onClick={() => signout()}
                    >
                      Sign Out
                    </Link>
                  ) : (
                    // eslint-disable-next-line
                    <Link
                      color="gray.500"
                      _active={{
                        transform: 'scale(0.95)'
                      }}
                      onClick={() => handleSignIn()}
                    >
                      Sign In
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {/* eslint-disable-next-line */}
                  <Link
                    color="gray.500"
                    _active={{
                      transform: 'scale(0.95)'
                    }}
                    onClick={() => handleNewProfile()}
                  >
                    New Profile
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
        {/* 
        N A V B A R  -  E n d
        */}

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

        {/*
        S I G N  I N  M O D A L  -  S t a r t
        */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>Sign in to manage your profiles</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody my={8}>
              <VStack spacing={8}>
                <HStack spacing={8}>
                  <Image height={8} src="github-yellow.svg" alt="GitHub" />
                  <Button
                    colorScheme="yellow"
                    color="white"
                    borderRadius="2xl"
                    onClick={() => signinGithub()}
                  >
                    Sign in with GitHub
                  </Button>
                </HStack>
                <HStack spacing={8}>
                  <Image height={8} src="google-yellow.svg" alt="Google" />
                  <Button
                    colorScheme="yellow"
                    color="white"
                    borderRadius="2xl"
                    onClick={() => signinGoogle()}
                  >
                    Sign in with Google
                  </Button>
                </HStack>
                {/* TODO: Add Twitter Login */}
                {/* <HStack spacing={8}>
                  <Image height={8} src="twitter-yellow.svg" alt="Twitter" />
                  <Button
                    colorScheme="yellow"
                    color="white"
                    borderRadius="2xl"
                    onClick={() => signinWithTwitter()}
                  >
                    Sign in with Twitter
                  </Button>
                </HStack> */}
              </VStack>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
        {/*
        S I G N  I N  M O D A L  -  E n d
        */}
      </Flex>
    </Flex>
  )
}
