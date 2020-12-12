import { Button, Text } from '@chakra-ui/react'

export default function ProfilePostSchema({ profile, setProfile }) {
  console.log('ProfilePostSchema/profile', profile)

  return (
    <div>
      <Text>Post Schema</Text>
      <Button m={1} onClick={() => setProfile({ ...profile, step: 2 })}>
        Back
      </Button>
    </div>
  )
}
