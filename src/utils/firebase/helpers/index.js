import { getUserId, getTimestamp } from "./utils";
import { getDoc, getAllDocsInCollection } from "./read";
import { setDoc, updateDoc } from "./write";
import { deleteDoc, deleteCollection } from "./delete";
import ERRORS from "./errors";

export {
  getUserId,
  getTimestamp,
  getDoc,
  getAllDocsInCollection,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteCollection,
  ERRORS
};
