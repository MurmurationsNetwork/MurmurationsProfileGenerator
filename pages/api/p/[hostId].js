import { getHostedProfile } from '@/lib/db-admin'

export default async (req, res) => {
  const hostId = req.query.hostId
  const { payload, error } = await getHostedProfile(hostId)

  if (error) {
    console.error('fetch hosted profile JSON', error)
    return res.status(404).json(error)
  }

  return res.status(200).json(payload)
}
