import { Button, Heading, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

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
      <NextLink href="/profile">
        <Link>profile</Link>
      </NextLink>
      <Text as="pre">{JSON.stringify(profile, null, 2)}</Text>
      {auth.user ? (
        <>
          <Button onClick={() => auth.signout()}>Sign Out</Button>
          <Text as="pre">{JSON.stringify(schemas, null, 2)}</Text>
        </>
      ) : (
        <Button onClick={() => auth.signinWithGithub('/dashboard')}>Sign In</Button>
      )}
    </div>
  )
}
