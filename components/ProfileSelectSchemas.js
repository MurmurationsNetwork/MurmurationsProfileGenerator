import { Button, Text } from '@chakra-ui/react'

export default function ProfileSelectSchemas({ profile, setStep }) {
  console.log('ProfileSelectSchemas/profile', profile)

  return (
    <div>
      <Text>Select Schemas</Text>
      <Button m={1} onClick={() => setStep(2)}>
        Next
      </Button>
    </div>
  )
}
