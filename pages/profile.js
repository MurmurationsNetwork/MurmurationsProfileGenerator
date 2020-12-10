import { Button, Heading, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'

export default function Profile() {
  const auth = useAuth()
  const { profile, setProfile } = useProfile()

  return (
    <div>
      <Heading>Profile</Heading>
      <NextLink href="/dashboard">
        <Link>dashboard</Link>
      </NextLink>
      <Text as="pre">{JSON.stringify(profile, null, 2)}</Text>
      {auth.user ? (
        <Button onClick={() => auth.signout()}>Sign Out</Button>
      ) : (
        <Button onClick={() => auth.signinWithGithub()}>Sign In</Button>
      )}
      <Button onClick={() => setProfile({ ...profile, url: 'https://test.com' })}>
        Mutate Profile State
      </Button>
    </div>
  )
}
