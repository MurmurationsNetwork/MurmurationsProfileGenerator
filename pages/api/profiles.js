import { getUserProfiles } from '@/lib/db-admin'
import { auth } from '@/lib/firebase-admin'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const profiles = await getUserProfiles(uid)

    res.status(200).json(profiles)
  } catch (error) {
    res.status(500).json({ error })
  }
}
