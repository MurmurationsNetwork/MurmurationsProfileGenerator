import { getUserProfiles } from '@/lib/db-admin'
import { auth } from '@/lib/firebase-admin'
import { compareDesc } from 'date-fns'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const profiles = await getUserProfiles(uid)

    profiles.sort((a, b) => compareDesc(a.updated, b.updated))

    res.status(200).json(profiles)
  } catch (error) {
    res.status(500).json({ error })
  }
}
