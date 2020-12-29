import { Button, Heading, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
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
      <div>
        <NextLink href="/">
          <Heading>Profile</Heading>
        </NextLink>
        <NextLink href="/dashboard">
          <Button>Dashboard</Button>
        </NextLink>
        {user ? (
          <Button onClick={() => signout()}>Sign Out</Button>
        ) : (
          <>
            <Button onClick={() => signinWithGithub()}>Sign In - GitHub</Button>
            <Button onClick={() => signinWithGoogle()}>Sign In - Google</Button>
          </>
        )}
        <>
          {profile.step === 1 ? (
            <ProfileSelectSchemas profile={profile} setProfile={setProfile} />
          ) : profile.step === 2 ? (
            <ProfileCreateProfile profile={profile} setProfile={setProfile} />
          ) : profile.step === 3 ? (
            <ProfilePostProfile profile={profile} setProfile={setProfile} user={user} />
          ) : (
            Router.push('/dashboard') && <Text>Redirecting...</Text>
          )}
        </>
      </div>
    </AppShell>
  )
}
