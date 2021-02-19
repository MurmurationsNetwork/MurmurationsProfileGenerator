import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import useSWR from 'swr'

import AppShell from '@/components/AppShell'
import DashboardProfiles from '@/components/DashboardProfiles'
import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'
import fetcher from '@/utils/fb-fetcher'

export default function Dashboard() {
  const { signinWithGithub, signinWithGoogle, user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setProfile } = useProfile()
  const { data, error } = useSWR(user ? ['/api/profiles', user.token] : null, fetcher, {
    refreshInterval: 5000
  })

  if (error) console.error('useSWR /api/profiles', error)

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
    <AppShell>
      <Flex backgroundColor="white" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          mt={{ base: 8, md: 16 }}
          mb={{ base: 2, md: 4 }}
          width="100%"
          maxWidth="50rem"
          flexDirection="column"
        >
          <Heading as="h1" textAlign="center" textStyle="h1" mb={{ base: 4, md: 8 }}>
            Dashboard
          </Heading>
        </Flex>
      </Flex>
      {user ? (
        <Flex
          width="100%"
          bg="yellow.50"
          py={{ base: 4, md: 8 }}
          mx="auto"
          px={{ base: 4, md: 8, lg: 16 }}
          flexDirection="column"
        >
          <Text textStyle="h2" mb={4}>
            Your Profiles
          </Text>
          {data ? (
            <DashboardProfiles profiles={data} setProfile={setProfile} />
          ) : (
            <Text>Loading...</Text>
          )}
        </Flex>
      ) : (
        <Flex
          width="100%"
          alignItems="center"
          bg="yellow.50"
          py={{ base: 4, md: 8 }}
          mx="auto"
          px={{ base: 4, md: 8, lg: 16 }}
          flexDirection="column"
        >
          <Text align="center" mb={8}>
            Want to host and manage your profiles with us after you create them?
          </Text>
          <Button
            variant="solid"
            maxWidth="8rem"
            fontSize={{ base: 'sm', md: 'lg' }}
            colorScheme="red"
            borderRadius="25px"
            height={{ base: 6, md: 8 }}
            _active={{
              transform: 'scale(0.95)'
            }}
            onClick={() => handleSignIn()}
          >
            Sign In
          </Button>
        </Flex>
      )}
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
    </AppShell>
  )
}
