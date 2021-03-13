import { Box, Button, Code, Flex, Input, Text } from '@chakra-ui/react'

export default function ToolsCreate() {
  const delResponse = `{
  "message": "Profile still exists at https://node.site/optional-subdirectory/node-profile.json for node_id a55964aeaae9625dc2b8dbdb1c4ce0ed1e658483f44cf2be1a6479fe5e144d38",
  "status": 400
}`

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
  )
}
