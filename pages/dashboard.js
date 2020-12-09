import { Button, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'
import { getSchemas } from '@/lib/library'
import { useProfile } from '@/lib/profile'

export async function getStaticProps() {
  const schemas = await getSchemas()

  return {
    props: { schemas }
  }
}

export default function Dashboard({ schemas }) {
  const auth = useAuth()
  const { profile } = useProfile()

  return (
    <div>
      <Heading>Dashboard</Heading>
      {auth.user ? (
        <>
          <Button onClick={() => auth.signout()}>Sign Out</Button>
          <Text as="pre">{JSON.stringify(profile, null, 2)}</Text>
          <Text as="pre">{JSON.stringify(schemas, null, 2)}</Text>
        </>
      ) : (
        <>
          <Text>Sign in to see the dashboard.</Text>
          <Button onClick={() => auth.signinWithGithub('/dashboard')}>Sign In</Button>
        </>
      )}
    </div>
  )
}
