import { Button, HStack, Text } from '@chakra-ui/react'
import Router from 'next/router'

export default function DashboardProfiles({ profiles, setProfile }) {
  function handleUpdate(node_id) {
    fetch(`/api/${node_id}`)
      .then(response => response.json())
      .then(data => {
        setProfile({ step: 1, ...data })
        Router.push('/profile')
      })
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
