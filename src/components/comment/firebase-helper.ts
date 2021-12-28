import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore/lite";
import { db } from "./comment-section";
import { CommentType } from "./CommentType";

export async function createOrUpdateProfile(usr) {
  if (usr) {
    const docSnap = await getDoc(doc(db, "userProfiles", usr.uid));
    const existingDoc = docSnap.data();
    if (
      !docSnap.exists() ||
      existingDoc.displayName !== usr.displayName ||
      existingDoc.photoURL !== usr.photoURL
    )
      await setDoc(doc(db, "userProfiles", usr.uid), {
        displayName: usr.displayName,
        photoURL: usr.photoURL,
        uid: usr.uid,
      });
  }
}

export function addComment(slug, user, comment) {
  const newComment = doc(collection(db, "blogComments"));
  return setDoc(
    newComment,
    {
      slug,
      comment,
      authorId: user.uid,
      timestamp: serverTimestamp(),
    },
    { merge: false }
  );
}

async function getUserProfiles(ids: string[]) {
  const userProfiles = collection(db, "userProfiles");
  const q = query(userProfiles, where("uid", "in", ids));
  const reducer = (prev, cur) => {
    prev[cur.uid] = cur;
    return prev;
  };
  const userList = (await getDocs(q)).docs.map((user) => user.data());
  return userList.reduce(reducer, {});
}

export async function getComments(slug) {
  const commentsCol = query(
    collection(db, "blogComments"),
    where("slug", "==", slug),
    orderBy("timestamp")
  );
  const commentList = (await getDocs(commentsCol)).docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  }) as CommentType[];
  if (!commentList.length) return [];
  const profileIds = commentList.map((comment) => comment.authorId);
  const userMap = await getUserProfiles(profileIds);
  commentList.forEach((value) => {
    value.authorName = userMap[value.authorId].displayName;
    value.authorPhoto = userMap[value.authorId].photoURL;
  });

  return commentList;
}
