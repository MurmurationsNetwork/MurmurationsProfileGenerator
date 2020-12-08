import { Button, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'

import { useAuth } from '@/lib/auth'

export default function Index() {
  const auth = useAuth()

  return (
    <div>
      <Head>
        <title>MPG</title>
      </Head>
      <Heading>Murmurations Profile Generator</Heading>
      <Text>Current User: {auth.user ? auth.user.name : 'None'}</Text>
      {!auth.user ? (
        <Button onClick={() => auth.signinWithGithub()}>Sign In</Button>
      ) : (
        <Button onClick={() => auth.signout()}>Sign Out</Button>
      )}
    </div>
  )
}
