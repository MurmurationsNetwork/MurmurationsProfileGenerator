import { db } from '@/lib/firebase-admin'

export function deleteProfile(node_id) {
  return db.collection('profiles').doc(node_id).delete()
}
