import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import useSWR from 'swr'

import AppShell from '@/components/AppShell'
import DashboardProfiles from '@/components/DashboardProfiles'
import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'
import fetcher from '@/utils/fb-fetcher'

export default function Dashboard() {
  const { user } = useAuth()
  const { resetProfile, setProfile } = useProfile()
  const { data, error } = useSWR(user ? ['/api/profiles', user.token] : null, fetcher, {
    refreshInterval: 5000
  })

  if (error) console.error('useSWR /api/profiles', error)

  return (
    <AppShell>
      <Flex backgroundColor="white" px={[4, 8, 16, 0]}>
        <Flex
          mx="auto"
          mt={{ base: 8, md: 16 }}
          mb={{ base: 2, md: 4 }}
          width="100%"
          maxWidth="50rem"
          flexDirection="column"
        >
          <Heading as="h1" textAlign="center" textStyle="h1" mb={{ base: 4, md: 8 }}>
            Dashboard
          </Heading>
        </Flex>
      </Flex>
      {/* <div>
        <NextLink href="/profile">
          <Button onClick={resetProfile}>Create Profile</Button>
        </NextLink>
        {user ? (
          <>
            <Button onClick={() => signout()}>Sign Out</Button>
            {data ? (
              <DashboardProfiles profiles={data} setProfile={setProfile} />
            ) : (
              <Text>Loading...</Text>
            )}
          </>
        ) : (
          <>
            <Button onClick={() => signinWithGithub()}>Sign In - GitHub</Button>
            <Button onClick={() => signinWithGoogle()}>Sign In - Google</Button>
          </>
        )}
      </div> */}
    </AppShell>
  )
}
