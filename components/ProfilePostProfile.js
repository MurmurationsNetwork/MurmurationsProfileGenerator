import {
  Box,
  Button,
  Code,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Switch,
  Text,
  useClipboard,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import cuid from 'cuid'
import { sha256 } from 'js-sha256'
import Router from 'next/router'
import { useEffect, useState } from 'react'

import SignIn from '@/components/SignIn'
import { postNode } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { createProfile } from '@/lib/db'

export default function ProfilePostProfile({ profile, resetProfile, setProfile }) {
  const [posted, setPosted] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  const [hosted, setHosted] = useState(false)
  const { hasCopied, onCopy } = useClipboard(JSON.stringify(profile.json, null, 2))
  const toast = useToast()
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()

  let profileJson = profile.json

  useEffect(() => {
    profile.hostId ? setHosted(true) : undefined
    profile.url ? setProfileUrl(profile.url) : undefined
  }, [])
  useEffect(() => {
    async function postNodeProfile() {
      if (posted) {
        // Remove superfluous step parameter from being posted to DB
        // eslint-disable-next-line
        const { step, ...postingProfile } = profile
        postingProfile.updated = Date.now()

        if (hosted && !postingProfile.hostId) {
          const hostId = cuid()
          const url = `${process.env.NEXT_PUBLIC_MURMURATIONS_MPG_URL}/api/p/${hostId}`
          postingProfile.url = url
          postingProfile.hostId = hostId
        }

        if (!postingProfile.node_id) {
          postingProfile.node_id = sha256(postingProfile.url)
        }
        // TODO - check that post to index worked before posting to Firebase
        await createProfile(postingProfile.node_id, postingProfile)
        await postNode(postingProfile.url)

        resetProfile()
        Router.push('/dashboard')
      }
    }

    postNodeProfile()
  }, [posted])

  function handleSignIn() {
    onOpen()
  }

  function handleToggle() {
    setHosted(!hosted)
  }

  function handleInput(e) {
    setProfileUrl(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!hosted && profileUrl.length < 1) {
      toast({
        title: 'Error posting profile',
        description: 'You need to enter a profile URL to indicate where your profile can be found.',
        status: 'error',
        position: 'top',
        duration: 7500,
        isClosable: true
      })
      return
    }
    if (hosted) {
      setProfile({
        ...profile,
        json: profileJson,
        user: user.uid
      })
    } else {
      // Don't store JSON for unhosted profiles
      // eslint-disable-next-line
      const { json, ...postingProfile } = profile
      setProfile({
        ...postingProfile,
        url: profileUrl,
        user: user?.uid || 'anonymous'
      })
    }
    setPosted(true)
    toast({
      title: 'Profile posted',
      description: 'The profile has been sent to the index for validation and posting.',
      status: 'success',
      position: 'top',
      duration: 5000,
      isClosable: true
    })
  }

  return (
    <Flex flexDirection="column">
      <Box px={{ base: 4, md: 16 }}>
        <Text pb={4} fontWeight="600">
          Your profile code has been created:
        </Text>
        <Code
          as="pre"
          variant="subtle"
          width="100%"
          whiteSpace="pre-wrap"
          p={4}
          borderRadius="10px"
        >
          {JSON.stringify(profile.json, null, 2)}
        </Code>
      </Box>
      <Flex
        width="100%"
        mx="auto"
        my={{ base: 8, md: 16 }}
        px={{ base: 4, md: 8, lg: 16 }}
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          variant="outline"
          size="md"
          fontSize={{ base: 'md', md: 'lg' }}
          colorScheme="red"
          borderRadius="25px"
          height={[6, 7, 8, 10]}
          my={{ base: 2, md: 0 }}
          minWidth="12rem"
          _active={{
            transform: 'scale(0.95)'
          }}
          onClick={() => setProfile({ ...profile, step: 2 })}
        >
          Back to Step 2
        </Button>
        <Button
          variant="outline"
          size="md"
          fontSize={{ base: 'md', md: 'lg' }}
          colorScheme="yellow"
          borderRadius="25px"
          height={[6, 7, 8, 10]}
          my={{ base: 2, md: 0 }}
          minWidth="12rem"
          _active={{
            transform: 'scale(0.95)'
          }}
          onClick={onCopy}
        >
          {hasCopied ? 'Profile Code Copied' : 'Copy Profile Code'}
        </Button>
      </Flex>
      <Flex
        width="100%"
        bg="yellow.50"
        py={{ base: 8, md: 16 }}
        mx="auto"
        px={{ base: 4, md: 8, lg: 16 }}
        flexDirection="column"
        alignItems="center"
      >
        <Text mb={{ base: 4, md: 8 }}>
          Please select where you would like to host your profile:
        </Text>
        <Stack spacing={8} isInline justifyContent="flex-start" alignItems="flex-start">
          <Text fontWeight="600">My website</Text>
          {user ? (
            <>
              <Switch
                size="lg"
                colorScheme="yellow"
                isChecked={profile.hostId}
                isDisabled={profile.hostId}
                onChange={handleToggle}
              />
              <Text fontWeight="600">Murmurations</Text>
            </>
          ) : (
            <>
              <Switch isDisabled={true} size="lg" colorScheme="yellow" onChange={handleToggle} />
              <Text fontWeight="600" opacity="25%">
                Murmurations
              </Text>
            </>
          )}
        </Stack>
        {!user && (
          <>
            <Text
              color="tomato"
              align="center"
              fontSize={{ base: '100%', md: '80%' }}
              mt={4}
              mb={2}
            >
              Sign in first if you want to manage (and even host) your profile(s) with us here.
            </Text>
            <Button
              variant="solid"
              size="md"
              fontSize={{ base: 'sm', md: 'md' }}
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
          </>
        )}
        <Flex
          bg="yellow.300"
          p={{ base: 4, md: 8 }}
          m={{ base: 4, md: 8 }}
          borderRadius="15px"
          width={{ base: '100%', md: '80%' }}
          flexDirection="column"
        >
          {hosted ? (
            <>
              <Heading textStyle="h3" mb={4}>
                Host Your Profile Here
              </Heading>
              <Text mb={4}>By clicking the Post Profile button, you confirm that: </Text>
              <Text>
                1) You are happy for Murmurations to host and share your profile on the web and to
                contact you about schema updates
              </Text>
              <Text>
                2) You have read and agree to our{' '}
                <Link color="gray.500" isExternal href="https://murmurations.network/principles/">
                  Principles
                </Link>
              </Text>
            </>
          ) : (
            <>
              <Heading textStyle="h3" mb={4}>
                Host Your Own Profile
              </Heading>
              <Text mb={4}>
                1) Copy the profile code above and save it to a file (e.g.,{' '}
                <Code>profile.json</Code>).
              </Text>
              <Text mb={4}>
                2) Upload the file to your website and tell us where we can view it:
              </Text>
              <Input
                name="profileUrl"
                type="text"
                placeholder="example: https://your.site/subdirectory/profile.json"
                value={profileUrl}
                onChange={handleInput}
                bgColor="white"
                mb={8}
              />
              <Text>
                By clicking the Post Profile button, you confirm that you have read and agree to our{' '}
                <Link color="gray.500" isExternal href="https://murmurations.network/principles/">
                  Principles
                </Link>
                .
              </Text>
            </>
          )}
          <Flex
            width="100%"
            ml="auto"
            mr="auto"
            mt={4}
            flexDirection="column"
            alignItems="flex-end"
            maxWidth="65rem"
          >
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
              onClick={handleSubmit}
            >
              Post Profile
            </Button>
          </Flex>
        </Flex>
        <SignIn isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Flex>
  )
}
