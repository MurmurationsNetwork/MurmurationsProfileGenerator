import { Button, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'

import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'

export default function Dashboard() {
  const auth = useAuth()
  const { profile, resetProfile } = useProfile()

  const clearProfile = () => {
    resetProfile()
    console.log('profile reset')
  }

  console.log('Dashboard/profile', profile)

  return (
    <div>
      <Heading>Dashboard</Heading>
      {auth.user ? (
        <>
          <NextLink href="/profile">
            <Button m={1} onClick={clearProfile}>
              Create Profile
            </Button>
          </NextLink>
          <Button m={1} onClick={() => auth.signout()}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button m={1} onClick={() => auth.signinWithGithub()}>
          Sign In
        </Button>
      )}
    </div>
  )
}
