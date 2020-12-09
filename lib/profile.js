import { createContext, useContext, useState } from 'react'

const profileContext = createContext()

export function ProfileProvider({ children }) {
  const profile = useProfileProvider()
  return <profileContext.Provider value={profile}>{children}</profileContext.Provider>
}

export function useProfile() {
  return useContext(profileContext)
}

function useProfileProvider() {
  const defaultProfile = {
    schemas: [],
    url: '',
    json: {}
  }
  const [profile, setProfile] = useState(defaultProfile)

  return { profile, setProfile }
}
