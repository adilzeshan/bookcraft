import { firestore as db } from "..";
import { makeSuccessResponse, makeErrorResponse } from "../../helpers";
import { ERRORS } from ".";

export function getDoc({ path, ref, formatData = true }) {
  const docRef = ref || db.doc(path);

  if (!docRef) return null;

  return docRef
    .get()
    .then(doc =>
      makeSuccessResponse({ data: { result: formatData ? doc.data() : doc } })
    )
    .catch(() =>
      makeErrorResponse({ data: { message: ERRORS.unknown.getDoc.default } })
    );
}

export async function getAllDocsInCollection({
  path,
  ref,
  orderBy,
  formatData = true
}) {
  let collectionRef = path ? db.collection(path) : ref;

  if (!collectionRef) return null;

  if (orderBy) collectionRef = collectionRef.orderBy(orderBy);

  const collectionData = await collectionRef.get().catch(() => []);
  return collectionData.docs.map(doc => (formatData ? doc.data() : doc));
}
