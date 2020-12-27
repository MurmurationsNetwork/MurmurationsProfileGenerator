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
    .set(data, { merge: true })
    .catch(error => console.error('db createProfile', error))
}

export function deleteProfile(node_id) {
  return firestore.collection('profiles').doc(node_id).delete()
}
