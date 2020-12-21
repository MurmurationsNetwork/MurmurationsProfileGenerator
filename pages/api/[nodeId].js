import { getProfile } from '@/lib/db-admin'

export default async (req, res) => {
  const nodeId = req.query.nodeId
  const { payload, error } = await getProfile(nodeId)

  if (error) {
    console.error('fetch profile', error)
    return res.status(404).json(error)
  }

  if (payload.hostId) return res.status(200).json(payload)

  if (!payload.hostId) {
    return fetch(payload.url)
      .then(response => response.json())
      .then(r => (payload.json = r))
      .then(() => res.status(200).json(payload))
  }
}
