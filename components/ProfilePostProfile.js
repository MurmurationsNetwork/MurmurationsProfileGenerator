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

  useEffect(() => {
    profile.hostId ? setHosted(true) : undefined
    profile.url ? setProfileUrl(profile.url) : undefined
  }, [])
  useEffect(() => {
    async function postNode() {
      if (posted) {
        // Remove superfluous step parameter from being posted to DB
        // eslint-disable-next-line
        const { step, ...postingProfile } = profile

        if (hosted && !postingProfile.hostId) {
          const hostId = cuid()
          const url = `${process.env.NEXT_PUBLIC_MURMURATIONS_MPG_URL}/api/p/${hostId}`
          postingProfile.url = url
          postingProfile.hostId = hostId
        }

        if (!postingProfile.node_id) {
          postingProfile.node_id = sha256(postingProfile.url)
        }

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
    if (hosted) {
      setProfile({
        ...profile,
        json: profileJson,
        user: user.uid
      })
    } else {
      // Don't store JSON for unhosted profiles
      // eslint-disable-next-line
      const { json, ...postingProfile } = profile
      setProfile({
        ...postingProfile,
        url: profileUrl,
        user: user?.uid || 'anonymous'
      })
    }
    setPosted(true)
  }

  return (
    <div>
      <Text>Post Schema</Text>
      {posted === true ? (
        <Text>
          The profile {!hosted ? `at <${profileUrl}>` : null} has been sent to the index for
          validation and posting.
        </Text>
      ) : (
        <div>
          <Button onClick={() => setProfile({ ...profile, step: 2 })}>Back</Button>
          <Button onClick={handleSubmit}>Next</Button>
          {!profile.hostId && (
            <>
              <Switch onChange={handleToggle} />
              <Text as="span">Host profile for me</Text>
            </>
          )}
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
          <Text as="pre">{JSON.stringify(profile.json, null, 2)}</Text>
        </div>
      )}
    </div>
  )
}
