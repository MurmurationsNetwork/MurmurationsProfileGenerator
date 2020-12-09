import { Button, Heading, Text } from '@chakra-ui/react'
import Router from 'next/router'

import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'

export default function Index() {
  const auth = useAuth()
  const { profile, setProfile } = useProfile()

  return (
    <div>
      <Heading>Index</Heading>
      {auth.user ? (
        Router.push('/dashboard') && <Text>Redirecting...</Text>
      ) : (
        <>
          <Button onClick={() => auth.signinWithGithub('/dashboard')}>Sign In</Button>
          <Button onClick={() => setProfile({ ...profile, url: 'https://test.com' })}>
            Mutate Profile State
          </Button>
          <Text as="pre">{JSON.stringify(profile, null, 2)}</Text>
        </>
      )}
    </div>
  )
}
