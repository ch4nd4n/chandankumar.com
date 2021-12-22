import React, { useState } from "react";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { firebaseConfig } from "../firebaseConfig";
import Comment from "./comment";
import Login from "./login";
import Signout from "./signout";
import AddComment from "./add-comment";

type Comment = {
  id: string;
  slug: string;
  comment: string;
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
      where("slug", "==", slug)
    );
    const commentSnapshot = await getDocs(commentsCol);
    const commentList = commentSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }) as Comment[];
    setComments(commentList);
  }

  async function addComment(comment) {
    let db = getFirestore(app);
    const newComment = doc(collection(db, "/blogPosts"));
    setDoc(newComment, { slug, comment }, { merge: false });
  }
  return (
    <>
      <Comment getComments={getComments} comments={comments} />
      {!user && <Login auth={auth} />}
      {user && (
        <>
          <div>
            <Signout auth={auth} setUser={setUser} />
          </div>
          <AddComment user={user} addComment={addComment} />
        </>
      )}
    </>
  );
};

export default CommentSection;
