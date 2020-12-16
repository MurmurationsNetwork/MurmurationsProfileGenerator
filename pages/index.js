import { Button, Heading, Text } from '@chakra-ui/react'
import Router from 'next/router'

import AppShell from '@/components/AppShell'
import { useAuth } from '@/lib/auth'

export default function Index() {
  const { signinWithGithub, user } = useAuth()

  return (
    <AppShell>
      <div>
        <Heading>Index</Heading>
        {user ? (
          Router.push('/dashboard') && <Text>Redirecting...</Text>
        ) : (
          <>
            <Button m={1} onClick={() => signinWithGithub('/dashboard')}>
              Sign In
            </Button>
          </>
        )}
      </div>
    </AppShell>
  )
}
