import { Button, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

import DashboardProfiles from '@/components/DashboardProfiles'
import { useAuth } from '@/lib/auth'
import { getProfiles } from '@/lib/db'
import { useProfile } from '@/lib/profile'

export default function Dashboard() {
  const { signinWithGithub, signout, user } = useAuth()
  const { profile, resetProfile, setProfile } = useProfile()
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    if (user) getProfiles(user.uid).then((data) => setProfiles(data))
  })

  return (
    <div>
      <Heading>Dashboard</Heading>
      {user ? (
        <>
          <NextLink href="/profile">
            <Button m={1} onClick={resetProfile}>
              Create Profile
            </Button>
          </NextLink>
          <Button m={1} onClick={() => signout()}>
            Sign Out
          </Button>
          {profiles ? <DashboardProfiles profiles={profiles} setProfiles={setProfiles} /> : null}
        </>
      ) : (
        <Button m={1} onClick={() => signinWithGithub()}>
          Sign In
        </Button>
      )}
    </div>
  )
}
