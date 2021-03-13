import { Box, Button, Code, Flex, Input, Text, useToast } from '@chakra-ui/react'
import { sha256 } from 'js-sha256'
import { useState } from 'react'

import { deleteNode } from '@/lib/api'

export default function ToolsCreate() {
  const [profile, setProfile] = useState('')
  const [response, setResponse] = useState({})
  const toast = useToast()

  function handleInput(e) {
    setProfile(e.target.value)
  }

  function handleDelete(e) {
    e.preventDefault()
    if (profile.length < 1) {
      toast({
        title: 'Error deleting profile',
        description: 'You need to enter a profile URL to indicate where your profile was located.',
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
        title: 'Error deleting profile',
        description: 'You need to enter a valid profile URL starting with http or https.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true
      })
      return
    }
    deleteNode(sha256(profile))
      .then(res => {
        if (res.status === 200) {
          toast({
            title: 'Profile deleted',
            description: 'The profile has been deleted from the index.',
            status: 'success',
            position: 'top',
            duration: 5000,
            isClosable: true
          })
        }
        setResponse(res)
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
        Delete the profile from your website so it is no longer accessible (your server should
        return a <Text as="code">404 Not Found</Text> error). Then enter the URL where your profile
        was located and click Delete:
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
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Flex>
      {response.status ? (
        response.status === 200 ? (
          <Text as="b" color="green.500">
            The profile has been removed from the index.
          </Text>
        ) : (
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
        )
      ) : null}
    </Flex>
  )
}
