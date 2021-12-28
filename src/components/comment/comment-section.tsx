import React, { useState } from "react";
import { Box, Container } from "theme-ui";
import firebase, { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore/lite";

import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

import { firebaseConfig } from "../firebaseConfig";
import CommentList from "./comment";
import Login from "./login";
import Signout from "./signout";
import AddComment from "./add-comment";
import { CommentType } from "./CommentType";

export type CommentProp = {
  slug: string;
};

let app, db;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  if (process.env.NODE_ENV === "development") {
    connectFirestoreEmulator(db, "localhost", 8080);
  }
} else {
  app = getApp();
}

const auth = getAuth();
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

async function createOrUpdateProfile(usr) {
  if (usr) {
    const usrRef = doc(db, "userProfiles", usr.uid);
    const docSnap = await getDoc(usrRef);
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

const CommentSection = (prop: CommentProp) => {
  const { slug } = prop;

  const [user, setUser] = useState(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  onAuthStateChanged(auth, async (usr) => {
    await createOrUpdateProfile(usr);
    usr ? setUser(usr) : setUser(null);
  });

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

  async function getComments() {
    const commentsCol = query(
      collection(db, "blogComments"),
      where("slug", "==", slug),
      orderBy("timestamp")
    );
    const commentList = (await getDocs(commentsCol)).docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }) as CommentType[];
    const profileIds = commentList.map((comment) => comment.authorId);
    const userMap = await getUserProfiles(profileIds);
    commentList.forEach((value) => {
      value.authorName = userMap[value.authorId].displayName;
      value.authorPhoto = userMap[value.authorId].photoURL;
    });
    setComments(commentList);
  }

  function addComment(comment) {
    let db = getFirestore(app);
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
  return (
    <Container>
      <CommentList getComments={getComments} comments={comments} />
      {!user && <Login auth={auth} />}
      {user && (
        <>
          <Box sx={{ mb: 3, mt: 3, textAlign: "right" }}>
            <span style={{ paddingRight: "5px" }}>{user.displayName}</span>
            <Signout auth={auth} setUser={setUser} />
          </Box>
          <AddComment
            user={user}
            addComment={addComment}
            getComments={getComments}
          />
        </>
      )}
    </Container>
  );
};

export default CommentSection;
