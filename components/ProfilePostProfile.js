import { Button, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'

export default function ProfilePostProfile({ profile, setProfile }) {
  console.log('ProfilePostSchema/profile', profile)
  const [submitted, setSubmitted] = useState(false)
  const [posted, setPosted] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  let profileJson = profile.json

  // Add `linked_schemas` into profile before posting to index
  profileJson.linked_schemas = profile.schemas

  function handleInput(e) {
    setSubmitted(false)
    setProfileUrl(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (profileUrl.length > 1) setPosted(true)
  }

  return (
    <div>
      <Text>Post Schema</Text>
      {posted === true ? (
        <Text>
          The profile at {`<${profileUrl}>`} has been sent to the index for validation and posting.
        </Text>
      ) : (
        <div>
          <Button m={1} onClick={() => setProfile({ ...profile, step: 2 })}>
            Back
          </Button>
          <Button m={1} onClick={handleSubmit}>
            Next
          </Button>
          <Input
            name="profileUrl"
            type="text"
            placeholder="example: https://your.site/subdirectory/profile.json"
            value={profileUrl}
            onChange={handleInput}
          />
          {submitted === true && profileUrl.length < 1 ? (
            <Text>You need to enter a profile URL!</Text>
          ) : null}
          <Text as="pre">{JSON.stringify(profileJson, null, 2)}</Text>
        </div>
      )}
    </div>
  )
}
