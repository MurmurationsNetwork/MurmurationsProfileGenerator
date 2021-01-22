import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  ModalFooter,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'

export default function AppShell({ children }) {
  const { signinWithGithub, signinWithGoogle, signout, user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleSignIn() {
    onOpen()
  }

  return (
    <Flex bg="white" height="100vh">
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
          display={{ base: 'grid', md: 'flex' }}
          flexDirection={{ base: 'column', md: 'row' }}
          backgroundColor="gray.50"
          justifyContent="space-around"
          alignItems="center"
          px={{ base: 2, md: 16 }}
          py={{ base: 1, md: 4 }}
        >
          <Flex mx={{ base: 'auto', md: 0 }} my={{ base: 4, md: 0 }}>
            <NextLink href="/">
              <Image
                height={['38px', '57px', '77px']}
                width={['50px', '75px', '100px']}
                src="murmurations-logo.png"
                alt="Murmurations"
              />
            </NextLink>
          </Flex>
          <Stack spacing={[8, 12, 16, 24]} isInline alignItems="center" mb={{ base: 2, md: 0 }}>
            <NextLink href="/dashboard">
              <Link color="gray.500">Dashboard</Link>
            </NextLink>
            {user ? (
              <Link color="gray.500" onClick={() => signout()}>
                Sign Out
              </Link>
            ) : (
              <Link color="gray.500" onClick={() => handleSignIn()}>
                Sign In
              </Link>
            )}
            <NextLink href="/profile">
              <Button
                variant="solid"
                size="md"
                fontSize={{ base: 'md', md: 'lg' }}
                colorScheme="red"
                borderRadius="25px"
                height={[6, 7, 8, 10]}
              >
                New Profile
              </Button>
            </NextLink>
          </Stack>
        </Flex>
        {/* 
        N A V B A R  -  E n d
        */}

        {children}

        {/* 
        F O O T E R  -  S t a r t
        */}
        <Flex
          backgroundColor="gray.50"
          px={[4, 8, 16, 0]}
          bottom={'0px'}
          pos={'absolute'}
          width="100%"
          maxWidth="75rem"
        >
          <Flex mx="auto" width="100%" maxWidth="780px" flexDirection="column">
            <Heading textAlign="center" my={{ base: 6, md: 12 }} textStyle="h4" color="gray.900">
              Murmurations Protocol
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
              <Link color="gray.500">Terms &amp; Conditions</Link>
              <Link color="gray.500">FAQs</Link>
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
                    onClick={() => signinWithGithub()}
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
                    onClick={() => signinWithGoogle()}
                  >
                    Sign in with Google
                  </Button>
                </HStack>
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
