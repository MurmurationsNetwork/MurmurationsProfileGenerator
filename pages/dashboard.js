import { Button, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'

import DashboardProfiles from '@/components/DashboardProfiles'
import { getProfileStatus } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { deleteProfile, getProfiles } from '@/lib/db'
import { useProfile } from '@/lib/profile'

export default function Dashboard() {
  const { signinWithGithub, signout, user } = useAuth()
  const { resetProfile } = useProfile()
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    if (user) {
      let profileList = []
      getProfiles(user.uid).then((nodeProfiles) => {
        nodeProfiles.forEach((nodeProfile) => {
          getProfileStatus(nodeProfile.node_id).then(({ data }) => {
            if (data === undefined) {
              deleteProfile(nodeProfile.node_id)
            } else {
              const { status } = data
              profileList.push({ ...nodeProfile, status })
              setProfiles([...profileList])
            }
          })
        })
      })
    }
  }, [user])

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
          {profiles ? <DashboardProfiles profiles={profiles} /> : null}
        </>
      ) : (
        <Button m={1} onClick={() => signinWithGithub()}>
          Sign In
        </Button>
      )}
    </div>
  )
}
