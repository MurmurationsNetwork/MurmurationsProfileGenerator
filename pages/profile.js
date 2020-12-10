import { Button, Heading, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import Router from 'next/router'

import { useAuth } from '@/lib/auth'
import { getSchemas } from '@/lib/library'
import { useProfile } from '@/lib/profile'

import ProfileCreateSchema from '../components/ProfileCreateSchema'
import ProfilePostSchema from '../components/ProfilePostSchema'
import ProfileSelectSchemas from '../components/ProfileSelectSchemas'

export async function getStaticProps() {
  const schemas = await getSchemas()

  return {
    props: { schemas },
    revalidate: 1
  }
}

export default function Profile({ schemas }) {
  const auth = useAuth()
  const { profile, setProfile, setStep } = useProfile()

  console.log('Profile/profile', profile)
  console.log('Profile/schemas', schemas)

  return (
    <div>
      <Heading>Profile</Heading>
      {auth.user ? (
        <>
          <NextLink href="/dashboard">
            <Button m={1}>Dashboard</Button>
          </NextLink>
          <Button m={1} onClick={() => auth.signout()}>
            Sign Out
          </Button>
          <Button m={1} onClick={() => setProfile({ ...profile, url: 'https://test.com' })}>
            Mutate Profile State
          </Button>
          {profile.step === 1 ? (
            <ProfileSelectSchemas profile={profile} setStep={setStep} />
          ) : profile.step === 2 ? (
            <ProfileCreateSchema profile={profile} setStep={setStep} />
          ) : profile.step === 3 ? (
            <ProfilePostSchema profile={profile} setStep={setStep} />
          ) : (
            Router.push('/dashboard') && <Text>Redirecting...</Text>
          )}
        </>
      ) : (
        <Button onClick={() => auth.signinWithGithub()}>Sign In</Button>
      )}
    </div>
  )
}
