import { auth, provider, firestore as db, firebase } from ".";
import { getTimestamp, ERRORS } from "./helpers";
import { makeSuccessResponse, makeErrorResponse } from "../helpers";

export async function login() {
  const signIn = await auth.signInWithPopup(provider);

  try {
    const { user } = signIn;
    const token = signIn.credential.accessToken;

    await db
      .doc(`users/${user.uid}`)
      .set({ token, timestamp: getTimestamp() }, { merge: true });

    return makeSuccessResponse({ data: { user, token } });
  } catch (error) {
    return makeErrorResponse({
      data: { message: ERRORS.unknown.login.default }
    });
  }
}

export async function logout() {
  const user = auth.currentUser;

  if (user) {
    await db.doc(`users/${user.uid}`).update({
      token: firebase.firestore.FieldValue.delete(),
      timestamp: getTimestamp()
    });
  }

  return auth
    .signOut()
    .then(() =>
      makeSuccessResponse({
        data: { message: ERRORS.success.logout.default }
      })
    )
    .catch(e =>
      makeErrorResponse({
        code: e && e.status,
        data: { message: ERRORS.unknown.logout.default, error: e }
      })
    );
}
