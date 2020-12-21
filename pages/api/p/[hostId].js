import { getHosted } from '@/lib/db-admin'

export default async (req, res) => {
  const hostId = req.query.hostId
  const { payload, error } = await getHosted(hostId)

  if (error) {
    console.log('error: ', error)
    return res.status(404).json(error)
  }

  return res.status(200).json(payload)
}
