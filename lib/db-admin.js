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
    console.error('db-admin getHostedProfile error:', error)
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
    console.error('db-admin getProfile error:', error)
    return { error }
  }
}

export async function getUserProfiles(uid) {
  try {
    const allProfiles = []
    const activeProfiles = []
    const snapshot = await db.collection('profiles').where('user', '==', uid).get()

    snapshot.forEach(doc => {
      allProfiles.push(doc.data())
    })

    await Promise.all(
      allProfiles.map(async profile => {
        // TODO - throw error if index is not available
        const profileStatus = await getNodeStatus(profile.node_id)
        if (profileStatus.data) {
          profile.status = profileStatus.data.status
          activeProfiles.push(profile)
        } else {
          // TODO - check that index is active before deleting the profile
          deleteProfile(profile.node_id)
        }
      })
    )

    return activeProfiles
  } catch (error) {
    console.error('db-admin getUserProfiles error:', error)
    return { error }
  }
}
