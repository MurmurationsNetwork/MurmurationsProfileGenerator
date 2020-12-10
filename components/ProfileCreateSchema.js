import { Button, Text } from '@chakra-ui/react'

export default function ProfileCreateSchema({ profile, setStep }) {
  console.log('ProfileCreateSchema/profile', profile)

  return (
    <div>
      <Text>Create Schema</Text>
      <Button m={1} onClick={() => setStep(1)}>
        Back
      </Button>
      <Button m={1} onClick={() => setStep(3)}>
        Next
      </Button>
    </div>
  )
}
