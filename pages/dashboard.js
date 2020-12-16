import { Button, Heading, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import useSWR from 'swr'

import AppShell from '@/components/AppShell'
import DashboardProfiles from '@/components/DashboardProfiles'
import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'
import fetcher from '@/utils/fetcher'

export default function Dashboard() {
  const { signinWithGithub, signout, user } = useAuth()
  const { resetProfile } = useProfile()
  const { data, error } = useSWR(user ? '/api/profiles' : null, fetcher)

  if (error) console.error('useSWR /api/profiles', error)

  return (
    <AppShell>
      <div>
        <Heading>Dashboard</Heading>
        {user ? (
          <>
            <NextLink href="/profile">
              <Button m={1} onClick={resetProfile}>
                Create Profile
              </Button>
            </NextLink>
            <Button m={1} onClick={() => signout()}>
              Sign Out
            </Button>
            {data ? <DashboardProfiles profiles={data} /> : <Text>Loading...</Text>}
          </>
        ) : (
          <Button m={1} onClick={() => signinWithGithub()}>
            Sign In
          </Button>
        )}
      </div>
    </AppShell>
  )
}
