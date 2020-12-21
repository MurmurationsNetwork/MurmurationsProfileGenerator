import { Button, HStack, Text } from '@chakra-ui/react'

export default function DashboardProfiles({ profiles }) {
  function handleUpdate(node_id) {
    fetch(`/api/${node_id}`)
      .then(response => response.json())
      .then(r => console.log(r))
    // write profile data to profile state
    // redirect to step 1 of profile flow
  }

  return (
    <div>
      {profiles.map(profile => (
        <HStack key={profile.node_id}>
          <Button onClick={() => handleUpdate(profile.node_id)}>Update</Button>
          <Button>Delete</Button>
          <Text>
            <strong>{profile.status}</strong> -- {profile.url} - {profile.schemas}
          </Text>
        </HStack>
      ))}
    </div>
  )
}
