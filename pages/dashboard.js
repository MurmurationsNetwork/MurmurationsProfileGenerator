import { Button, Heading } from '@chakra-ui/react'
import NextLink from 'next/link'

import { useAuth } from '@/lib/auth'
import { useProfile } from '@/lib/profile'

const sample = {
  name: 'IC3 Dev',
  url: 'https://ic3.dev',
  urls: [
    {
      name: 'Homepage',
      url: 'https://ic3.dev'
    },
    {
      name: 'Another homepage',
      url: 'https://ic3.network'
    }
  ],
  mission: 'We make stuff...',
  keywords: ['open-source', 'beer'],
  geolocation: {
    lat: 52.2053,
    lon: 0.1218
  },
  location: {
    locality: 'Cambridge',
    region: 'Cambridgeshire',
    country: 'GB'
  }
}

export default function Dashboard() {
  const { signinWithGithub, signout, user } = useAuth()
  const { profile, resetProfile, setProfile } = useProfile()

  function modifyProfile() {
    setProfile({ ...profile, step: 1, schemas: ['demo-v2'], json: sample })
  }

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
          <NextLink href="/profile">
            <Button m={1} onClick={modifyProfile}>
              Modify Profile
            </Button>
          </NextLink>
          <Button m={1} onClick={() => signout()}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button m={1} onClick={() => signinWithGithub()}>
          Sign In
        </Button>
      )}
    </div>
  )
}
