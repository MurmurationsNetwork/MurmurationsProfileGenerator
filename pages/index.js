import { Button, Heading, Text } from '@chakra-ui/react'
import Router from 'next/router'

import { useAuth } from '@/lib/auth'

export default function Index() {
  const auth = useAuth()

  return (
    <div>
      <Heading>Index</Heading>
      {auth.user ? (
        Router.push('/dashboard') && <Text>Redirecting...</Text>
      ) : (
        <>
          <Button onClick={() => auth.signinWithGithub('/dashboard')}>Sign In</Button>
        </>
      )}
    </div>
  )
}
