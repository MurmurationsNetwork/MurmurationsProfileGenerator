import { Box, Button, Code, Flex, Input, Text, useToast } from '@chakra-ui/react'
import { useState } from 'react'

import { getNodeStatus, postNode } from '@/lib/api'

export default function ToolsCreate() {
  const [profile, setProfile] = useState('')
  const [nodeId, setNodeId] = useState('')
  const [response, setResponse] = useState('')
  const toast = useToast()

  function handleInput(e) {
    setProfile(e.target.value)
  }

  function handlePost(e) {
    e.preventDefault()
    if (profile.length < 1) {
      toast({
        title: 'Error posting profile',
        description: 'You need to enter a profile URL to indicate where your profile can be found.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true
      })
      return
    }
    const valid = /^(http|https):\/\/[^ "]+$/.test(profile)
    if (!valid) {
      toast({
        title: 'Error posting profile',
        description: 'You need to enter a valid profile URL starting with http or https.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true
      })
      return
    }
    postNode(profile)
      .then(res => setNodeId(res.data.node_id))
      .catch(err => console.err(err))
  }

  function handleStatus(e) {
    e.preventDefault()
    getNodeStatus(nodeId)
      .then(res => {
        setResponse(res.data)
        if (res.data.status === 'posted') {
          toast({
            title: 'Profile posted',
            description: 'The profile has been posted to the index.',
            status: 'success',
            position: 'top',
            duration: 5000,
            isClosable: true
          })
        }
      })
      .catch(err => console.err(err))
  }

  return (
    <Flex
      width="100%"
      ml="auto"
      mr="auto"
      px={{ base: 2, md: 8, lg: 16 }}
      py={{ base: 8, md: 12, lg: 16 }}
      flexDirection="column"
      maxWidth="65rem"
      bg="gray.50"
      borderRadius="5px"
    >
      <Text>
        Post your new or updated profile on your website. Then enter the URL of your profile and
        click Post:
      </Text>
      <Input
        name="profileUrl"
        type="text"
        placeholder="https://your.site/directory/profile.json"
        value={profile}
        onChange={handleInput}
        bgColor="white"
        mt={2}
      />
      <Flex
        width="100%"
        ml="auto"
        mr="auto"
        my={4}
        flexDirection="column"
        alignItems="flex-start"
        maxWidth="65rem"
      >
        <Button
          variant="solid"
          minWidth="8rem"
          size="md"
          fontSize={{ base: 'md', md: 'lg' }}
          colorScheme="red"
          borderRadius="25px"
          height={[6, 7, 8, 10]}
          _active={{
            transform: 'scale(0.95)'
          }}
          onClick={handlePost}
        >
          Post
        </Button>
      </Flex>
      {nodeId ? (
        <>
          <Text>
            Your profile&apos;s{' '}
            <Text as="code">
              <Text as="b">node_id</Text>
            </Text>{' '}
            is:
          </Text>
          <Text as="code" mt={2}>
            {nodeId}
          </Text>
          <Text mt={4}>Click Status to see your profile&apos;s status in the index:</Text>
          <Flex
            width="100%"
            ml="auto"
            mr="auto"
            my={4}
            flexDirection="column"
            alignItems="flex-start"
            maxWidth="65rem"
          >
            <Button
              variant="solid"
              minWidth="8rem"
              size="md"
              fontSize={{ base: 'md', md: 'lg' }}
              colorScheme="red"
              borderRadius="25px"
              height={[6, 7, 8, 10]}
              _active={{
                transform: 'scale(0.95)'
              }}
              onClick={handleStatus}
            >
              Status
            </Button>
          </Flex>
        </>
      ) : null}
      {response ? (
        <>
          <Box>
            <Code
              as="pre"
              variant="subtle"
              width="100%"
              whiteSpace="pre-wrap"
              p={4}
              borderRadius="10px"
            >
              {JSON.stringify(response, null, 2)}
            </Code>
          </Box>
          <Text mt={4}>You can click Status again to check for any changes.</Text>
        </>
      ) : null}
    </Flex>
  )
}
