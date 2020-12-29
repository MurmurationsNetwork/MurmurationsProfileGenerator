import { Button, Heading, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import Router from 'next/router'

import AppShell from '@/components/AppShell'
import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'

export default function Index() {
  const { signinWithGithub, signinWithGoogle, user } = useAuth()
  const { resetProfile } = useProfile()

  return (
    <AppShell>
      <div>
        <Heading>Index</Heading>
        {user ? (
          Router.push('/dashboard') && <Text>Redirecting...</Text>
        ) : (
          <>
            <NextLink href="/dashboard">
              <Button>Dashboard</Button>
            </NextLink>
            <NextLink href="/profile">
              <Button onClick={resetProfile}>Create Profile</Button>
            </NextLink>
            <Button onClick={() => signinWithGithub('/dashboard')}>Sign In - GitHub</Button>
            <Button onClick={() => signinWithGoogle('/dashboard')}>Sign In - Google</Button>
          </>
        )}
      </div>
    </AppShell>
  )
}
