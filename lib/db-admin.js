import { db } from '@/lib/firebase-admin'

export function deleteProfile(node_id) {
  return db.collection('profiles').doc(node_id).delete()
}

export async function getHostedProfile(hostId) {
  try {
    const hosted = []
    const snapshot = await db.collection('profiles').where('hostId', '==', hostId).get()

    snapshot.forEach(doc => {
      hosted.push(doc.data())
    })

    const payload = hosted[0].json
    return { payload }
  } catch (error) {
    return { error }
  }
}

export async function getProfile(node_id) {
  try {
    const profiles = []
    const snapshot = await db.collection('profiles').where('node_id', '==', node_id).get()

    snapshot.forEach(doc => {
      profiles.push(doc.data())
    })

    const payload = profiles[0]
    return { payload }
  } catch (error) {
    return { error }
  }
}
