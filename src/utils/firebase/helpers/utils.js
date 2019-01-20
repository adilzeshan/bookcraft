import { auth } from "../config";
import { firebase } from "..";

export function getUserId() {
  return auth.currentUser.uid;
}

export function getTimestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}
