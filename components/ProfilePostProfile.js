import { Button, Input, Switch, Text } from '@chakra-ui/react'
import cuid from 'cuid'
import { sha256 } from 'js-sha256'
import { useEffect, useState } from 'react'

import { postNode } from '@/lib/api'
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
    async function postNodeProfile() {
      if (posted) {
        // Remove superfluous step parameter from being posted to DB
        // eslint-disable-next-line
        const { step, ...postingProfile } = profile
        postingProfile.updated = Date.now()

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
        await postNode(postingProfile.url)
      }
    }

    postNodeProfile()
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
          {!profile.hostId && user && (
            <>
              <Switch onChange={handleToggle} />
              <Text as="span">Host profile for me</Text>
            </>
          )}
          {!user && (
            <>
              <Switch isDisabled={true} />
              <Text as="span">Host profile for me</Text>
              <Text color="tomato">
                Sign in above to host your profile with us and/or manage your profiles after you
                create them
              </Text>
            </>
          )}
          {!hosted && (
            <>
              <Text>
                Or enter the URL (usually at your own website) where you will host your profile:
              </Text>
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
          <Text as="pre" bg="gray.200">
            {JSON.stringify(profile.json, null, 2)}
          </Text>
        </div>
      )}
    </div>
  )
}
