import { firestore as db } from "..";
import { makeSuccessResponse, makeErrorResponse } from "../../helpers";
import { ERRORS } from ".";

export function deleteDoc({ path, ref }) {
  const docRef = ref || db.doc(path);

  if (!docRef) return null;

  return docRef
    .delete()
    .then(() =>
      makeSuccessResponse({
        data: { message: ERRORS.success.deleteDoc.default }
      })
    )
    .catch(e =>
      makeErrorResponse({
        data: { message: ERRORS.unknown.deleteDoc.default, error: e }
      })
    );
}

export async function deleteCollection({ path, ref }) {
  const collectionRef = ref || db.collection(path);

  if (!collectionRef) return null;

  const toDelete = [];
  const docs = await collectionRef.get();

  docs.forEach(doc => {
    const docToDelete = doc.ref.delete();
    toDelete.push(docToDelete);
  });

  return Promise.all(toDelete)
    .then(() =>
      makeSuccessResponse({
        data: { message: ERRORS.success.deleteCollection.default }
      })
    )
    .catch(e =>
      makeErrorResponse({
        data: { message: ERRORS.unknown.deleteCollection.default, error: e }
      })
    );
}
