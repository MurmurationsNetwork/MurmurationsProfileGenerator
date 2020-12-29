import firebase from '@/lib/firebase'

const firestore = firebase.firestore()

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
    .catch(error => console.error('db createUser error;', error))
}

export function createProfile(node_id, data) {
  return firestore
    .collection('profiles')
    .doc(node_id)
    .set(data, { merge: true })
    .catch(error => console.error('db createProfile error;', error))
}

export function deleteProfile(node_id) {
  return firestore
    .collection('profiles')
    .doc(node_id)
    .delete()
    .catch(error => console.error('db deleteProfile error:', error))
}
