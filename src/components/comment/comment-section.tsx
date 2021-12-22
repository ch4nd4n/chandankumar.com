import React, { useState } from "react";
import { Box, Container } from "theme-ui";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { firebaseConfig } from "../firebaseConfig";
import CommentList from "./comment";
import Login from "./login";
import Signout from "./signout";
import AddComment from "./add-comment";

type Comment = {
  id: string;
  slug: string;
  comment: string;
  displayName: string;
};

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

const CommentSection = (prop: CommentProp) => {
  const { slug } = prop;

  const [user, setUser] = useState(null);
  const [comments, setComments] = useState<Comment[]>([]);

  onAuthStateChanged(auth, (usr) => {
    usr ? setUser(usr) : setUser(null);
  });

  async function getComments() {
    const commentsCol = query(
      collection(db, "blogPosts"),
      where("slug", "==", slug),
      orderBy("timestamp")
    );
    const commentSnapshot = await getDocs(commentsCol);
    const commentList = commentSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }) as Comment[];
    setComments(commentList);
  }

  function addComment(comment) {
    let db = getFirestore(app);
    const newComment = doc(collection(db, "/blogPosts"));
    return setDoc(
      newComment,
      {
        slug,
        comment,
        displayName: user.displayName,
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
