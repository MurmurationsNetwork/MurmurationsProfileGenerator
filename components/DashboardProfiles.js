import { Button, HStack, Text } from '@chakra-ui/react'
import useSWR from 'swr'

import fetcher from '@/utils/fetcher'

export default function DashboardProfiles({ profiles, setProfiles }) {
  profiles.forEach((profile) => {
    let statusUrl = `${process.env.NEXT_PUBLIC_MURMURATIONS_INDEX_API_URL}/nodes/${profile.node_id}`
    const { data, error } = useSWR(statusUrl, fetcher)
    if (error) console.error('fetch profile status', error)
    const currentProfile = data?.data

    if (currentProfile?.status) {
      profiles.forEach((profile, index) => {
        if (profile.node_id === currentProfile.node_id) {
          let updatedProfiles = profiles
          let updatedProfile = { ...updatedProfiles[index], status: currentProfile.status }
          updatedProfiles[index] = updatedProfile
          setProfiles(updatedProfiles)
        }
      })
    }
  })

  return (
    <div>
      {profiles.map((profile) => (
        <HStack key={profile.node_id}>
          <Button>Update</Button>
          <Button>Delete</Button>
          <Text>
            <strong>{profile.status}</strong> -- {profile.url} - {profile.schemas}
          </Text>
        </HStack>
      ))}
    </div>
  )
}
