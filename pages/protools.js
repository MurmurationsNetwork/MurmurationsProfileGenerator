import { Flex, Heading, Text } from '@chakra-ui/react'

import AppShell from '@/components/AppShell'
import ToolsCreate from '@/components/ToolsCreate'
import ToolsDelete from '@/components/ToolsDelete'

export default function ProTools() {
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
      <ToolsCreate />
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
      <ToolsDelete />
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
