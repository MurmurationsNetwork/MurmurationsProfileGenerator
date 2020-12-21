import { Button, Input, Switch, Text } from '@chakra-ui/react'
import cuid from 'cuid'
import { sha256 } from 'js-sha256'
import { useEffect, useState } from 'react'

import { postProfileUrl } from '@/lib/api'
import { createProfile } from '@/lib/db'

export default function ProfilePostProfile({ profile, setProfile, user }) {
  const [submitted, setSubmitted] = useState(false)
  const [posted, setPosted] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  const [hosted, setHosted] = useState(false)
  let profileJson = profile.json

  profileJson.linked_schemas = profile.schemas

  useEffect(() => {
    async function postNode() {
      if (posted) {
        // Remove superfluous step parameter from being posted to DB
        // eslint-disable-next-line
        const { step, ...postingProfile } = profile

        if (hosted) {
          const hostId = cuid()
          const url = `${process.env.NEXT_PUBLIC_MURMURATIONS_MPG_URL}/api/p/${hostId}`
          postingProfile.url = url
          postingProfile.hostId = hostId
        }

        postingProfile.node_id = sha256(postingProfile.url)

        await createProfile(postingProfile.node_id, postingProfile)
        await postProfileUrl(postingProfile.url)
      }
    }

    postNode()
  }, [posted])

  function handleToggle() {
    setHosted(!hosted)
  }

  function handleInput(e) {
    setSubmitted(false)
    setProfileUrl(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (!hosted && profileUrl.length < 1) {
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
          <Button onClick={() => setProfile({ ...profile, step: 2 })}>Back</Button>
          <Button onClick={handleSubmit}>Next</Button>
          <Switch onChange={handleToggle} />
          <Text as="span">Host profile for me</Text>
          {!hosted && (
            <>
              <Text>Enter the URL where your profile will be hosted:</Text>
              <Input
                name="profileUrl"
                type="text"
                placeholder="example: https://your.site/subdirectory/profile.json"
                value={profileUrl}
                onChange={handleInput}
              />
            </>
          )}
          {submitted === true && hosted === false && profileUrl.length < 1 ? (
            <Text>You need to enter a profile URL!</Text>
          ) : null}
          <Text as="pre">{JSON.stringify(profileJson, null, 2)}</Text>
        </div>
      )}
    </div>
  )
}
