import { Button, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export default function App() {
  return (
    <Flex flexDirection="column" fontSize={['xs', 'sm', 'md', 'lg', 'xl']}>
      <Flex flexDirection="column" width="100%" maxWidth="1200px" mx="auto">
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
              alt="Murmurations"
            />
          </Flex>
          <Stack spacing={[8, 12, 16, 24]} isInline alignItems="center" mb={{ base: 2, md: 0 }}>
            <Link color="#757575">Dashboard</Link>
            <Link color="#757575">Sign In</Link>
            <Button
              variant="solid"
              size="md"
              fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
              // backgroundColor="#f95a58"
              // color="#ffffff"
              colorScheme="orange"
              borderRadius="25px"
              height={[6, 7, 8, 10]}
            >
              New Profile
            </Button>
          </Stack>
        </Flex>
        <Flex backgroundColor="#ffffff" px={[4, 8, 16, 0]}>
          <Flex
            mx="auto"
            mb={{ base: 2, md: 6 }}
            width="100%"
            maxWidth="780px"
            flexDirection="column"
          >
            <Heading as="h1" textAlign="center" textStyle="h1" mt={{ base: 4, md: 12 }}>
              Murmurations
            </Heading>
            <Text
              as="h2"
              color="#757575"
              fontSize="125%"
              textAlign="center"
              mb={{ base: 4, md: 8 }}
            >
              Profile Generator
            </Text>
            <Text as="h3">
              Include your world-changing project or organisation in the Murmurations Index.
              Creating your profile only takes three quick steps:
            </Text>
          </Flex>
        </Flex>
        <Flex backgroundColor="#fcf9f3" px={[4, 8, 16, 0]}>
          <Flex
            mx="auto"
            my={{ base: 2, md: 6 }}
            width="100%"
            maxWidth="780px"
            flexDirection="column"
          >
            <Text textAlign="center">3 Steps</Text>
          </Flex>
        </Flex>
        <Flex backgroundColor="#ffffff" px={[4, 8, 16, 0]}>
          <Flex
            mx="auto"
            my={{ base: 2, md: 6 }}
            width="100%"
            maxWidth="780px"
            flexDirection="column"
          >
            <Text>
              You can edit or delete your profile any time, plus you can create as many as you need
              and manage them from your <Link color="orange.500">dashboard</Link>.
            </Text>
          </Flex>
        </Flex>
        <Flex backgroundColor="#f7c687" px={[4, 8, 16, 0]}>
          <Flex
            mx="auto"
            my={{ base: 2, md: 6 }}
            width="100%"
            maxWidth="780px"
            flexDirection="column"
          >
            <Heading as="h3" textStyle="h3" color="#ffffff">
              No need to log in—we respect your privacy
            </Heading>
            <Text>
              There is no need to sign in to use this service if you choose to host your profile on
              your own.
            </Text>
          </Flex>
        </Flex>
        <Flex backgroundColor="#fcf9f3" px={[4, 8, 16, 0]}>
          <Flex
            mx="auto"
            my={{ base: 2, md: 6 }}
            width="100%"
            maxWidth="780px"
            flexDirection="column"
          >
            <Text textAlign="center" mb={{ base: 2, md: 6 }}>
              Would you like to learn more about the Murmurations Network?
            </Text>
            <Stack spacing={2} flexDirection="row" isInline justifyContent="space-around">
              <Button
                variant="outline"
                size="md"
                fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
                colorScheme="orange"
                borderRadius="15px"
                height={[6, 7, 8, 10]}
              >
                Visit Our Home Site
              </Button>
              <Button
                variant="outline"
                size="md"
                fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
                colorScheme="orange"
                borderRadius="15px"
                height={[6, 7, 8, 10]}
              >
                Find Us on GitHub
              </Button>
            </Stack>
          </Flex>
        </Flex>
        <Flex
          backgroundColor="#efeeed"
          px={[4, 8, 16, 0]}
          // bottom={'0px'}
          // pos={'absolute'}
          mx="auto"
          width="100%"
        >
          <Flex mx="auto" width="100%" maxWidth="780px" flexDirection="column">
            <Heading textAlign="center" textStyle="h4" my={{ base: 2, md: 6 }}>
              Murmurations Protocol
            </Heading>
            <Stack
              spacing={[8, 12, 16, 24]}
              isInline
              justifyContent="center"
              alignItems="stretch"
              fontSize={'80%'}
            >
              <Link color="#3a3939">Home Site</Link>
              <Link color="#3a3939">Terms &amp; Conditions</Link>
              <Link color="#3a3939">FAQs</Link>
            </Stack>
            <Flex mx="auto" my={{ base: 2, md: 6 }}>
              <Image
                height={['15px', null, '20px']}
                width={['15px', null, '20px']}
                src="github-logo.svg"
                alt="GitHub"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
