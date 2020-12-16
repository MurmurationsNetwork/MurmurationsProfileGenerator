import { getProfileStatus } from '@/lib/api'
import { deleteProfile } from '@/lib/db-admin'
import { db } from '@/lib/firebase-admin'

export default async (_, res) => {
  const snapshot = await db.collection('profiles').get()
  const allProfiles = []
  const activeProfiles = []

  snapshot.forEach(doc => {
    allProfiles.push(doc.data())
  })

  await Promise.all(
    allProfiles.map(async profile => {
      const profileStatus = await getProfileStatus(profile.node_id)
      if (profileStatus.data) {
        profile.status = profileStatus.data.status
        activeProfiles.push(profile)
      } else {
        deleteProfile(profile.node_id)
      }
    })
  )

  return res.status(200).json(activeProfiles)
}
