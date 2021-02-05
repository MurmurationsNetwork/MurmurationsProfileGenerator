import {
  Box,
  Button,
  Code,
  Flex,
  HStack,
  Input,
  Switch,
  Text,
  useClipboard,
  useToast
} from '@chakra-ui/react'
import cuid from 'cuid'
import { sha256 } from 'js-sha256'
import { useEffect, useState } from 'react'

import { postNode } from '@/lib/api'
import { createProfile } from '@/lib/db'

export default function ProfilePostProfile({ profile, setProfile, user }) {
  const [posted, setPosted] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  const [hosted, setHosted] = useState(false)
  const { hasCopied, onCopy } = useClipboard(JSON.stringify(profile.json, null, 2))
  const toast = useToast()

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

        await createProfile(postingProfile.node_id, postingProfile)
        await postNode(postingProfile.url)
      }
    }

    postNodeProfile()
  }, [posted])

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
        // my={{ base: 8, md: 16 }}
        px={{ base: 4, md: 8, lg: 16 }}
        flexDirection="column"
        // justifyContent="space-between"
        alignItems="center"
      >
        <Text mb={{ base: 4, md: 8 }}>
          Please select where you would like to host your profile:
        </Text>

        {posted === true ? (
          <Text>
            The profile {!hosted ? `at <${profileUrl}>` : null} has been sent to the index for
            validation and posting.
          </Text>
        ) : (
          <>
            {!profile.hostId && user && (
              <HStack
                bg="yellow.300"
                padding={{ base: 4, md: 8 }}
                spacing={{ base: 4, md: 16 }}
                borderRadius="15px"
              >
                <Text fontWeight="600">My website</Text>
                <Switch size="lg" colorScheme="yellow" onChange={handleToggle} />
                <Text fontWeight="600">Here at MPG</Text>
              </HStack>
            )}
            {!user && (
              // TODO: Copy formatting from above
              <>
                <HStack spacing={{ base: 4, md: 16 }}>
                  <Text as="span">Host it myself</Text>
                  <Switch
                    isDisabled={true}
                    size="lg"
                    colorScheme="yellow"
                    onChange={handleToggle}
                  />
                  <Text as="span">Host it for me</Text>
                </HStack>
                <Text color="tomato">
                  Sign in above to host your profile with us and/or manage your profiles after you
                  create them
                </Text>
              </>
            )}
            {!hosted && (
              <>
                <Text>
                  Or enter the URL (usually at your own website) where you will host your profile:
                </Text>
                <Input
                  name="profileUrl"
                  type="text"
                  placeholder="example: https://your.site/subdirectory/profile.json"
                  value={profileUrl}
                  onChange={handleInput}
                />
              </>
            )}
            <Button onClick={handleSubmit}>Next</Button>
          </>
        )}
      </Flex>
      {/* {posted === true ? (
        <Text>
          The profile {!hosted ? `at <${profileUrl}>` : null} has been sent to the index for
          validation and posting.
        </Text>
      ) : (
        <div>
          {!profile.hostId && user && (
            <>
              <Switch size="lg" onChange={handleToggle} />
              <Text as="span">Host profile for me</Text>
            </>
          )}
          {!user && (
            <>
              <Switch isDisabled={true} />
              <Text as="span">Host profile for me</Text>
              <Text color="tomato">
                Sign in above to host your profile with us and/or manage your profiles after you
                create them
              </Text>
            </>
          )} */}
      {/* {!hosted && (
            <>
              <Text>
                Or enter the URL (usually at your own website) where you will host your profile:
              </Text>
              <Input
                name="profileUrl"
                type="text"
                placeholder="example: https://your.site/subdirectory/profile.json"
                value={profileUrl}
                onChange={handleInput}
              />
            </>
          )}
        </div>
      )} */}
    </Flex>
  )
}
