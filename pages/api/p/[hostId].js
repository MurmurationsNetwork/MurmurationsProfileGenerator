import { getHosted } from '@/lib/db-admin'

export default async (req, res) => {
  const hostId = req.query.hostId
  const { payload, error } = await getHosted(hostId)

  if (error) {
    res.status(500).json(error)
  }

  res.status(200).json(payload)
}
