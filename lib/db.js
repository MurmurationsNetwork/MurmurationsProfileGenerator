import firebase from '@/lib/firebase'

const firestore = firebase.firestore()

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}

export function createProfile(node_id, data) {
  return firestore
    .collection('profiles')
    .doc(node_id)
    .set({ node_id, ...data }, { merge: true })
}

export async function getProfiles(uid) {
  const snapshot = await firestore.collection('profiles').where('user', '==', uid).get()

  const profiles = []

  snapshot.forEach((doc) => {
    profiles.push(doc.data())
  })

  return profiles
}
