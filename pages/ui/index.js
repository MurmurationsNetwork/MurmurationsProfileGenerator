import React from 'react'
import { Flex, Stack, Link, Button, Image, Heading, Text } from '@chakra-ui/react'

const App = () => (
  <Flex flexDirection="column">
    <Flex
      backgroundColor="#efeeed"
      justifyContent="space-between"
      alignItems="center"
      pt={[0, 4]}
      pb={[0, 4]}
      pl={[0, 16]}
      pr={[0, 16]}
    >
      <Flex>
        <Image height="77px" width="100px" src="murmurations-logo.png" />
      </Flex>
      <Stack spacing={16} isInline alignItems="center">
        <Link color="#757575">Dashboard</Link>
        <Link color="#757575">Sign In</Link>
        <Button
          variant="solid"
          size="md"
          backgroundColor="#f95a58"
          color="#ffffff"
          borderRadius="15px"
          height={8}
        >
          New Profile
        </Button>
      </Stack>
    </Flex>
    <Flex backgroundColor="#ffffff">
      <Flex ml="auto" mr="auto" width="100%" maxWidth="780px" flexDirection="column">
        <Heading textAlign="center" textStyle="h2" mt={12}>
          Murmurations Protocol
        </Heading>
        <Text color="#757575" fontSize="xl" textAlign="center" mb={8}>
          Profile Manager
        </Text>
        <Text mb={4}>
          If you are ready to include your world-changing project or organisation in the
          Murmurations Index, you have come to the right place.
        </Text>
        <Text>Creating your profile only takes three quick steps:</Text>
      </Flex>
    </Flex>
  </Flex>
)

export default App
