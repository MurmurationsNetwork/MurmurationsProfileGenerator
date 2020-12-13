import { Button, Heading, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import Router from 'next/router'

import ProfileCreateProfile from '@/components/ProfileCreateProfile'
import ProfilePostProfile from '@/components/ProfilePostProfile'
import ProfileSelectSchemas from '@/components/ProfileSelectSchemas'
import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'

export default function Profile() {
  const { signinWithGithub, signout, user } = useAuth()
  const { profile, setProfile } = useProfile()

  return (
    <div>
      <Heading>Profile</Heading>
      {user ? (
        <>
          <NextLink href="/dashboard">
            <Button m={1}>Dashboard</Button>
          </NextLink>
          <Button m={1} onClick={() => signout()}>
            Sign Out
          </Button>
          {profile.step === 1 ? (
            <ProfileSelectSchemas profile={profile} setProfile={setProfile} />
          ) : profile.step === 2 ? (
            <ProfileCreateProfile profile={profile} setProfile={setProfile} />
          ) : profile.step === 3 ? (
            <ProfilePostProfile profile={profile} setProfile={setProfile} />
          ) : (
            Router.push('/dashboard') && <Text>Redirecting...</Text>
          )}
        </>
      ) : (
        <Button onClick={() => signinWithGithub()}>Sign In</Button>
      )}
    </div>
  )
}
