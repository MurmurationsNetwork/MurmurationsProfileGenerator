import { Flex, Heading, Text } from '@chakra-ui/react'
import Router from 'next/router'

import AppShell from '@/components/AppShell'
import ProfileCreateProfile from '@/components/ProfileCreateProfile'
import ProfilePostProfile from '@/components/ProfilePostProfile'
import ProfileSelectSchemas from '@/components/ProfileSelectSchemas'
import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'

export default function Profile() {
  const { signinWithGithub, signinWithGoogle, signout, user } = useAuth()
  const { profile, setProfile } = useProfile()

  return (
    <AppShell>
      <Flex backgroundColor="white" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          my={{ base: 10, md: 20 }}
          width="100%"
          maxWidth="50rem"
          flexDirection="column"
        >
          <Heading as="h1" textAlign="center" textStyle="h1" mb={{ base: 2, md: 4 }}>
            Create a Profile
          </Heading>
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
