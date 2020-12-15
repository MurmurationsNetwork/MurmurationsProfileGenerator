import { Button, HStack, Text } from '@chakra-ui/react'

export default function DashboardProfiles({ profiles }) {
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
