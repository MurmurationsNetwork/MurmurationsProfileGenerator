import { Button, Heading, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import Router from 'next/router'

import ProfileCreateSchema from '@/components/ProfileCreateSchema'
import ProfilePostSchema from '@/components/ProfilePostSchema'
import ProfileSelectSchemas from '@/components/ProfileSelectSchemas'
import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'

export default function Profile() {
  const { signinWithGithub, signout, user } = useAuth()
  const { profile, setProfile, setStep } = useProfile()

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
            <ProfileCreateSchema profile={profile} setProfile={setProfile} />
          ) : profile.step === 3 ? (
            <ProfilePostSchema profile={profile} setProfile={setProfile} />
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
