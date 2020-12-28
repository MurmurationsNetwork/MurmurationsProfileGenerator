import { getNodeStatus } from '@/lib/api'
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

export async function getUserProfiles(uid) {
  const allProfiles = []
  const activeProfiles = []
  const snapshot = await db.collection('profiles').where('user', '==', uid).get()

  snapshot.forEach(doc => {
    allProfiles.push(doc.data())
  })

  await Promise.all(
    allProfiles.map(async profile => {
      const profileStatus = await getNodeStatus(profile.node_id)
      if (profileStatus.data) {
        profile.status = profileStatus.data.status
        activeProfiles.push(profile)
      } else {
        deleteProfile(profile.node_id)
      }
    })
  )

  return activeProfiles
}
