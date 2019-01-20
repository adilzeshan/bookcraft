import { firestore as db } from "..";

export function setDoc({ path, ref, data }) {
  const docRef = ref || db.doc(path);

  if (!docRef) return null;

  return docRef
    .set(data, { merge: true })
    .then(() => true)
    .catch(() => false);
}

export function updateDoc({ path, ref, data }) {
  const docRef = ref || db.doc(path);

  if (!docRef) return null;

  return docRef
    .update(data)
    .then(() => true)
    .catch(() => false);
}
