import { Box, Button, Code, Flex, Heading, Input, Text } from '@chakra-ui/react'

import AppShell from '@/components/AppShell'

export default function ProTools() {
  const response = `{
  "data": {
    "node_id": "a55964aeaae9625dc2b8dbdb1c4ce0ed1e658483f44cf2be1a6479fe5e144d38",
    "profile_url": "https://node.site/optional-subdirectory/node-profile.json",
    "status": "received"
  }
}`

  const delResponse = `{
  "message": "Profile still exists at https://node.site/optional-subdirectory/node-profile.json for node_id a55964aeaae9625dc2b8dbdb1c4ce0ed1e658483f44cf2be1a6479fe5e144d38",
  "status": 400
}`

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
            Pro Tools
          </Heading>
          <Text
            as="h2"
            color="yellow.500"
            fontSize="150%"
            fontWeight="600"
            textAlign="center"
            mb={{ base: 4, md: 8 }}
          >
            Create/Update Profile
          </Text>
        </Flex>
      </Flex>
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
        <Text>Enter the URL of your profile and click Post:</Text>
        <Input
          name="profileUrl"
          type="text"
          placeholder="https://your.site/directory/profile.json"
          value="" //{profileUrl}
          onChange={() => {}} //{handleInput}
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
            onClick={() => {}} //{handleSubmit}
          >
            Post
          </Button>
        </Flex>
        <Text>
          Your profile&apos;s{' '}
          <Text as="code">
            <Text as="b">node_id</Text>
          </Text>{' '}
          is:
        </Text>
        <Text as="code" mt={2}>
          a55964aeaae9625dc2b8dbdb1c4ce0ed1e658483f44cf2be1a6479fe5e144d38
        </Text>
        <Text mt={4}>Click Status to see your profile&apos;s status in the Index:</Text>
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
            onClick={() => {}} //{handleSubmit}
          >
            Status
          </Button>
        </Flex>
        <Box>
          <Code
            as="pre"
            variant="subtle"
            width="100%"
            whiteSpace="pre-wrap"
            p={4}
            borderRadius="10px"
          >
            {response /*JSON.stringify(profile.json, null, 2) */}
          </Code>
        </Box>
        <Text mt={4}>You can click Status again to check for any changes.</Text>
      </Flex>
      <Flex backgroundColor="white" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          mt={{ base: 8, md: 16 }}
          mb={{ base: 2, md: 4 }}
          width="100%"
          maxWidth="50rem"
          flexDirection="column"
        >
          <Text
            as="h2"
            color="yellow.500"
            fontSize="150%"
            fontWeight="600"
            textAlign="center"
            mb={{ base: 4, md: 8 }}
          >
            Delete Profile
          </Text>
        </Flex>
      </Flex>
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
          First, delete the profile from your website so it is no longer accessible (your server
          should return a <Text as="code">404 Not Found</Text> error).
        </Text>
        <Text mt={4}>Now enter the URL where your profile was located and click Delete:</Text>
        <Input
          name="profileUrl"
          type="text"
          placeholder="https://your.site/directory/profile.json"
          value="" //{profileUrl}
          onChange={() => {}} //{handleInput}
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
            onClick={() => {}} //{handleSubmit}
          >
            Delete
          </Button>
        </Flex>
        <Box>
          <Code
            as="pre"
            variant="subtle"
            width="100%"
            whiteSpace="pre-wrap"
            p={4}
            borderRadius="10px"
          >
            {delResponse /*JSON.stringify(profile.json, null, 2) */}
          </Code>
        </Box>
      </Flex>
      <Flex
        width="100%"
        ml="auto"
        mr="auto"
        my={{ base: 8, md: 16 }}
        px="2"
        flexDirection="column"
        alignItems="flex-end"
        maxWidth="65rem"
      ></Flex>
    </AppShell>
  )
}
