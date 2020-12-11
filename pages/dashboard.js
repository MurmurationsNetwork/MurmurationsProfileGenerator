import { Button, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'

import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'

export default function Dashboard() {
  const { signinWithGithub, signout, user } = useAuth()
  const { profile, resetProfile, setProfile } = useProfile()

  function modifyProfile() {
    setProfile({ ...profile, schemas: ['demo-v2', 'murmurations_users-v1'] })
  }

  return (
    <div>
      <Heading>Dashboard</Heading>
      {user ? (
        <>
          <NextLink href="/profile">
            <Button m={1} onClick={resetProfile}>
              Create Profile
            </Button>
          </NextLink>
          <NextLink href="/profile">
            <Button m={1} onClick={modifyProfile}>
              Modify Profile
            </Button>
          </NextLink>
          <Button m={1} onClick={() => signout()}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button m={1} onClick={() => signinWithGithub()}>
          Sign In
        </Button>
      )}
    </div>
  )
}
