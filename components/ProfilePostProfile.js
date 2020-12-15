import { Button, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { postProfileUrl } from '@/lib/api'
import { createProfile } from '@/lib/db'

export default function ProfilePostProfile({ profile, setProfile, user }) {
  const [submitted, setSubmitted] = useState(false)
  const [posted, setPosted] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  let profileJson = profile.json

  profileJson.linked_schemas = profile.schemas

  useEffect(() => {
    async function postNode() {
      if (posted) {
        const result = await postProfileUrl(profile.url)
        postProfile(result.data.node_id)
      }
    }

    postNode()
  }, [posted])

  async function postProfile(node_id) {
    // Remove superfluous step parameter from being posted to DB
    // eslint-disable-next-line
    const { step, ...postingProfile } = profile
    postingProfile.node_id = node_id
    createProfile(node_id, postingProfile)
  }

  function handleInput(e) {
    setSubmitted(false)
    setProfileUrl(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (profileUrl.length < 1) {
      return
    }
    setProfile({
      ...profile,
      json: profileJson,
      url: profileUrl,
      user: user.uid
    })
    setPosted(true)
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
