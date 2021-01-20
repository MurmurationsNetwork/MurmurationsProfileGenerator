import { Button, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

export default function App() {
  return (
    <Flex
      flexDirection="column"
      width="100%"
      maxWidth="1200px"
      mx="auto"
      fontSize={['sm', 'md', 'lg', 'xl']}
    >
      {/* 
      N A V B A R
      */}
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
          <NextLink href="/">
            <Image
              height={['38px', '57px', '77px']}
              width={['50px', '75px', '100px']}
              src="murmurations-logo.png"
              alt="Murmurations"
            />
          </NextLink>
        </Flex>
        <Stack spacing={[8, 12, 16, 24]} isInline alignItems="center" mb={{ base: 2, md: 0 }}>
          <Link color="#757575">Dashboard</Link>
          <Link color="#757575">Sign In</Link>
          <Button
            variant="solid"
            size="md"
            fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
            colorScheme="red"
            borderRadius="25px"
            height={[6, 7, 8, 10]}
          >
            New Profile
          </Button>
        </Stack>
      </Flex>
      {/* 
      H E A D E R
      */}
      <Flex backgroundColor="#ffffff" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          my={{ base: 6, md: 12 }}
          width="100%"
          maxWidth="780px"
          flexDirection="column"
        >
          <Heading as="h1" textAlign="center" textStyle="h1" mb={{ base: 2, md: 4 }}>
            Murmurations
          </Heading>
          <Text as="h2" color="#757575" fontSize="125%" textAlign="center" mb={{ base: 4, md: 8 }}>
            Profile Generator
          </Text>
          <Text as="h3">
            Include your world-changing project or organisation in the Murmurations Index. Create
            your profile in three quick steps:
          </Text>
        </Flex>
      </Flex>
      {/* 
      3  S T E P S
      */}
      <Flex backgroundColor="#fcf9f3" px={[4, 8, 16, 0]}>
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
              <Text textAlign="center" fontSize={'125%'} fontWeight={'600'} color="#e59b3a">
                1
              </Text>
              <Image
                height={{ base: '120px', md: '160px' }}
                width={{ base: '150px', md: '200px' }}
                src="step1.svg"
              />
              <Text textAlign="center" fontSize={'110%'} fontWeight={'600'} color="#e59b3a">
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
              <Text textAlign="center" fontSize={'125%'} fontWeight={'600'} color="#e59b3a">
                2
              </Text>
              <Image
                height={{ base: '120px', md: '160px' }}
                width={{ base: '150px', md: '200px' }}
                src="step2.svg"
              />
              <Text textAlign="center" fontSize={'110%'} fontWeight={'600'} color="#e59b3a">
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
              <Text textAlign="center" fontSize={'125%'} fontWeight={'600'} color="#e59b3a">
                3
              </Text>
              <Image
                height={{ base: '120px', md: '160px' }}
                width={{ base: '150px', md: '200px' }}
                src="step3.svg"
              />
              <Text textAlign="center" fontSize={'110%'} fontWeight={'600'} color="#e59b3a">
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
          >
            Get Started
          </Button>
        </Flex>
      </Flex>
      {/* 
      D A S H B O A R D  E X P L A I N E R
      */}
      <Flex backgroundColor="#ffffff" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          my={{ base: 6, md: 12 }}
          width="100%"
          maxWidth="780px"
          flexDirection="column"
        >
          <Text>
            After you sign in, you can edit or delete your profile at any time. Plus you can create
            as many as you need and manage them from your <Link color="red.500">dashboard</Link>.
          </Text>
        </Flex>
      </Flex>
      {/* 
      P R I V A C Y  E X P L A I N E R
      */}
      <Flex backgroundColor="#f7c687" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          my={{ base: 4, md: 4 }}
          width="100%"
          maxWidth="780px"
          flexDirection="column"
        >
          <Heading as="h3" textStyle="h3" color="#ffffff">
            Optional login—we respect your privacy
          </Heading>
          <Text>
            There is no need to sign in to generate a profile if you choose to host your profile on
            your own website.
          </Text>
        </Flex>
      </Flex>
      {/* 
      L E A R N  M O R E
      */}
      <Flex backgroundColor="#ffffff" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          my={{ base: 6, md: 12 }}
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
              colorScheme="red"
              borderRadius="15px"
              height={[6, 7, 8, 10]}
            >
              Visit Our Home Site
            </Button>
            <Button
              variant="outline"
              size="md"
              fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
              colorScheme="red"
              borderRadius="15px"
              height={[6, 7, 8, 10]}
            >
              Find Us on GitHub
            </Button>
          </Stack>
        </Flex>
      </Flex>
      {/* 
      F O O T E R
      */}
      <Flex
        backgroundColor="#efeeed"
        px={[4, 8, 16, 0]}
        // bottom={'0px'}
        // pos={'absolute'}
        mx="auto"
        width="100%"
      >
        <Flex mx="auto" width="100%" maxWidth="780px" flexDirection="column">
          <Heading textAlign="center" textStyle="h4" my={{ base: 6, md: 12 }}>
            Murmurations Protocol
          </Heading>
          <Stack
            spacing={[8, 12, 16, 24]}
            isInline
            justifyContent="center"
            alignItems="stretch"
            fontSize={{ base: '90%', md: '80%' }}
          >
            <Link color="#757575">Home Site</Link>
            <Link color="#757575">Terms &amp; Conditions</Link>
            <Link color="#757575">FAQs</Link>
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
  )
}
