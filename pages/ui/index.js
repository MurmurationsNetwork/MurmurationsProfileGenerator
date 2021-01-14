import React from 'react'
import { Box, Flex, Stack, Link, Button, Image, Heading, Text } from '@chakra-ui/react'

const App = () => (
  <Flex flexDirection="column" fontSize={['xs', 'sm', 'md', 'lg', 'xl']}>
    <Flex
      display={{ base: 'grid', md: 'flex' }}
      flexDirection={{ base: 'column', md: 'row' }}
      backgroundColor="#efeeed"
      justifyContent="space-around"
      alignItems="center"
      px={{ base: 2, md: 16 }}
      py={{ base: 1, md: 4 }}
    >
      <Flex mx={{ base: 'auto', md: 0 }} my={{ base: 4, md: 0 }}>
        <Image
          height={['38px', '57px', '77px']}
          width={['50px', '75px', '100px']}
          src="murmurations-logo.png"
        />
      </Flex>
      <Stack spacing={[8, 12, 16, 24]} isInline alignItems="center" mb={{ base: 2, md: 0 }}>
        <Link color="#757575">Dashboard</Link>
        <Link color="#757575">Sign In</Link>
        <Button
          variant="solid"
          size="md"
          fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
          backgroundColor="#f95a58"
          color="#ffffff"
          borderRadius="25px"
          height={[6, 7, 8, 10]}
        >
          New Profile
        </Button>
      </Stack>
    </Flex>
    <Flex backgroundColor="#ffffff" px={[4, 8, 16, 0]}>
      <Flex ml="auto" mr="auto" width="100%" maxWidth="780px" flexDirection="column">
        <Heading textAlign="center" textStyle="h2" mt={{ base: 4, md: 12 }}>
          Murmurations
        </Heading>
        <Text color="#757575" fontSize="125%" textAlign="center" mb={{ base: 4, md: 8 }}>
          Profile Generator
        </Text>
        <Text>
          Include your world-changing project or organisation in the Murmurations Index. Creating
          your profile only takes three quick steps:
        </Text>
      </Flex>
    </Flex>
  </Flex>
)

export default App
