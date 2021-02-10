import { Flex, Heading, Text } from '@chakra-ui/react'
import useSWR from 'swr'

import AppShell from '@/components/AppShell'
import DashboardProfiles from '@/components/DashboardProfiles'
import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'
import fetcher from '@/utils/fb-fetcher'

export default function Dashboard() {
  const { user } = useAuth()
  const { setProfile } = useProfile()
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
      {
        user ? (
          <Flex
            width="100%"
            bg="yellow.50"
            py={{ base: 4, md: 8 }}
            mx="auto"
            px={{ base: 4, md: 8, lg: 16 }}
            flexDirection="column"
          >
            <Text textStyle="h2" mb={4}>
              Your Profiles
            </Text>
            {data ? (
              <DashboardProfiles profiles={data} setProfile={setProfile} />
            ) : (
              <Text>Loading...</Text>
            )}
          </Flex>
        ) : null /* TODO: Check for user and show message if not logged in */
      }
    </AppShell>
  )
}
