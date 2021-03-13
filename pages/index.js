import { Button, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import Router from 'next/router'

import AppShell from '@/components/AppShell'
import { useProfile } from '@/lib/profile'

export default function Index() {
  const { resetProfile } = useProfile()

  function handleNewProfile() {
    resetProfile()
    Router.push('/profile')
  }

  function handleProTools() {
    Router.push('/protools')
  }

  return (
    <AppShell>
      {/* 
      H E A D E R  -  S t a r t
      */}
      <Flex backgroundColor="white" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          my={{ base: 8, md: 16 }}
          width="100%"
          maxWidth="50rem"
          flexDirection="column"
        >
          <Heading as="h1" textAlign="center" textStyle="h1" mb={{ base: 2, md: 4 }}>
            Murmurations
          </Heading>
          <Text as="h2" color="gray.500" fontSize="125%" textAlign="center" mb={{ base: 4, md: 8 }}>
            Profile Generator
          </Text>
          <Text as="h3">
            Include your world-changing project or organisation in the Murmurations Index. Create
            your profile in three quick steps:
          </Text>
        </Flex>
      </Flex>
      {/* 
      H E A D E R  -  E n d
      */}

      {/* 
      3  S T E P S  -  S t a r t
      */}
      <Flex backgroundColor="yellow.50" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          my={{ base: 6, md: 12 }}
          width="100%"
          maxWidth="780px"
          flexDirection="column"
          alignItems="center"
        >
          <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }}>
            <Flex
              alignItems="center"
              width={{ base: '100%' }}
              minWidth="200px"
              flexDirection="column"
              mx="3"
              px={{ base: 12, md: 2 }}
              py={{ base: 4, md: 0 }}
            >
              <Text textAlign="center" fontSize={'125%'} fontWeight={'600'} color="yellow.600">
                1
              </Text>
              <Image
                height={{ base: '120px', md: '160px' }}
                width={{ base: '150px', md: '200px' }}
                src="step1.svg"
              />
              <Text textAlign="center" fontSize={'110%'} fontWeight={'600'} color="yellow.600">
                Select Schemas
              </Text>
              <Text mt={{ base: 3, md: 6 }} fontSize={{ base: '90%', md: '80%' }}>
                Schemas are created by the networks you want to be found in and define the
                information they collect.
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              width={{ base: '100%' }}
              minWidth="200px"
              flexDirection="column"
              mx="3"
              px={{ base: 12, md: 2 }}
              py={{ base: 4, md: 0 }}
            >
              <Text textAlign="center" fontSize={'125%'} fontWeight={'600'} color="yellow.600">
                2
              </Text>
              <Image
                height={{ base: '120px', md: '160px' }}
                width={{ base: '150px', md: '200px' }}
                src="step2.svg"
              />
              <Text textAlign="center" fontSize={'110%'} fontWeight={'600'} color="yellow.600">
                Complete Form
              </Text>
              <Text mt={{ base: 3, md: 6 }} fontSize={{ base: '90%', md: '80%' }}>
                Fill in the information requested by the schemas you selected in order to complete
                your profile.
              </Text>
            </Flex>
            <Flex
              alignItems="center"
              width={{ base: '100%' }}
              minWidth="200px"
              flexDirection="column"
              mx="3"
              px={{ base: 12, md: 2 }}
              py={{ base: 4, md: 0 }}
            >
              <Text textAlign="center" fontSize={'125%'} fontWeight={'600'} color="yellow.600">
                3
              </Text>
              <Image
                height={{ base: '120px', md: '160px' }}
                width={{ base: '150px', md: '200px' }}
                src="step3.svg"
              />
              <Text textAlign="center" fontSize={'110%'} fontWeight={'600'} color="yellow.600">
                Post Profile
              </Text>
              <Text mt={{ base: 3, md: 6 }} fontSize={{ base: '90%', md: '80%' }}>
                Your profile code will be generated. You can publish it on your website or we can
                host it for you.
              </Text>
            </Flex>
          </Flex>
          <Button
            variant="solid"
            size="lg"
            fontSize={['sm', 'md', 'lg', 'xl']}
            colorScheme="red"
            borderRadius="15px"
            width="30%"
            maxWidth="300px"
            mt={{ base: 5, md: 12 }}
            height={[8, 9, 10, 12]}
            _active={{
              transform: 'scale(0.95)'
            }}
            onClick={() => handleNewProfile()}
          >
            Get Started
          </Button>
        </Flex>
      </Flex>
      {/* 
      3  S T E P S  -  E n d
      */}

      {/* 
      D A S H B O A R D  E X P L A I N E R  -  S t a r t
      */}
      <Flex backgroundColor="white" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          my={{ base: 10, md: 20 }}
          width="100%"
          maxWidth="780px"
          flexDirection="column"
        >
          <Text>
            If you sign in, you can edit or delete your profile at any time, and we will even host
            it for you. Plus you can create as many profiles as you need and manage them from your{' '}
            <NextLink href="/dashboard">
              <Link color="red.500">dashboard</Link>
            </NextLink>
            .
          </Text>
        </Flex>
      </Flex>
      {/* 
      D A S H B O A R D  E X P L A I N E R  -  E n d
      */}

      {/* 
      P R I V A C Y  E X P L A I N E R  -  S t a r t
      */}
      <Flex backgroundColor="yellow.300" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          my={{ base: 6, md: 12 }}
          width="100%"
          maxWidth="780px"
          flexDirection="column"
        >
          <Heading as="h3" textStyle="h3" color="white" mb={{ base: 3, md: 6 }}>
            Optional login—we respect your privacy
          </Heading>
          <Text>
            There is no need to sign in to generate a profile if you choose to host it on your own
            website. Use our <Text as="b">Pro Tools</Text> to add your profile to the index and
            update the index when you make changes.
          </Text>
          <Flex
            alignItems="center"
            width={{ base: '100%' }}
            minWidth="200px"
            flexDirection="column"
          >
            <Button
              variant="solid"
              size="lg"
              fontSize={['sm', 'md', 'lg', 'xl']}
              colorScheme="red"
              borderRadius="15px"
              width="30%"
              maxWidth="300px"
              mt={{ base: 5, md: 12 }}
              height={[8, 9, 10, 12]}
              _active={{
                transform: 'scale(0.95)'
              }}
              onClick={() => handleProTools()}
            >
              Pro Tools
            </Button>
          </Flex>
        </Flex>
      </Flex>
      {/* 
      P R I V A C Y  E X P L A I N E R  -  E n d
      */}

      {/* 
      L E A R N  M O R E  -  S t a r t
      */}
      <Flex backgroundColor="white" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          my={{ base: 10, md: 20 }}
          width="100%"
          maxWidth="780px"
          flexDirection="column"
        >
          <Text textAlign="center" mb={{ base: 4, md: 8 }}>
            Would you like to learn more about the Murmurations Protocol?
          </Text>
          <Stack spacing={12} flexDirection="row" isInline justifyContent="center">
            <Button
              variant="outline"
              size="md"
              fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
              colorScheme="yellow"
              borderRadius="15px"
              height={[6, 7, 8, 10]}
              _active={{
                transform: 'scale(0.95)'
              }}
            >
              <a href="https://murmurations.network" target="_blank" rel="noreferrer noopener">
                Visit Our Home Site
              </a>
            </Button>
            <Button
              variant="outline"
              size="md"
              fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
              colorScheme="yellow"
              borderRadius="15px"
              height={[6, 7, 8, 10]}
              _active={{
                transform: 'scale(0.95)'
              }}
            >
              <a
                href="https://github.com/MurmurationsNetwork/MurmurationsProtocol"
                target="_blank"
                rel="noreferrer noopener"
              >
                Find Us on GitHub
              </a>
            </Button>
          </Stack>
        </Flex>
      </Flex>
      {/* 
      L E A R N  M O R E  -  E n d
      */}
    </AppShell>
  )
}
