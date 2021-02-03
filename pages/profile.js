import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import Router from 'next/router'

import AppShell from '@/components/AppShell'
import ProfileCreateProfile from '@/components/ProfileCreateProfile'
import ProfilePostProfile from '@/components/ProfilePostProfile'
import ProfileSelectSchemas from '@/components/ProfileSelectSchemas'
import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'

export default function Profile() {
  const { user } = useAuth()
  const { profile, setProfile } = useProfile()

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
            Create a Profile
          </Heading>
          <Stack
            spacing={0}
            isInline
            justifyContent="center"
            alignItems="center"
            mb={{ base: 4, md: 8 }}
          >
            <Image
              height={{ base: '8', md: '16' }}
              src={profile.step >= 1 ? 'step1-on.svg' : 'step1-off.svg'}
            />
            <Image
              width={{ base: '60px', md: '120px' }}
              height={{ base: '4px', md: '8px' }}
              src="step-dots.svg"
            />
            <Image
              height={{ base: '8', md: '16' }}
              src={profile.step >= 2 ? 'step2-on.svg' : 'step2-off.svg'}
            />
            <Image
              width={{ base: '60px', md: '120px' }}
              height={{ base: '4px', md: '8px' }}
              src="step-dots.svg"
            />
            <Image
              height={{ base: '8', md: '16' }}
              src={profile.step >= 3 ? 'step3-on.svg' : 'step3-off.svg'}
            />
          </Stack>
          <Text
            as="h2"
            color="yellow.500"
            fontSize="150%"
            fontWeight="600"
            textAlign="center"
            mb={{ base: 4, md: 8 }}
          >
            {profile.step === 1
              ? 'Select Schemas'
              : profile.step === 2
              ? 'Add Your Details'
              : profile.step === 3
              ? 'Post Your Profile'
              : null}
          </Text>
        </Flex>
      </Flex>
      {profile.step === 1 ? (
        <ProfileSelectSchemas profile={profile} setProfile={setProfile} />
      ) : profile.step === 2 ? (
        <ProfileCreateProfile profile={profile} setProfile={setProfile} />
      ) : profile.step === 3 ? (
        <ProfilePostProfile profile={profile} setProfile={setProfile} user={user} />
      ) : (
        Router.push('/dashboard') && <Text>Redirecting...</Text>
      )}
    </AppShell>
  )
}
