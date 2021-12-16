import React from "react";

import { initializeApp } from "firebase/app";
import {
  collection,
  connectFirestoreEmulator,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore/lite";

import { useEffect } from "react";
import { useState } from "react";
const firebaseConfig = {
  projectId: "chandankumar-com",
};

type CommentProp = {
  slug: string;
};

type Comment = {
  slug: string;
  comment: string;
};

const Comment = (prop: CommentProp) => {
  const { slug } = prop;
  const [comments, setComments] = useState<Comment[]>(null);

  async function getComments() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    if (process.env.NODE_ENV === "development") {
      connectFirestoreEmulator(db, "localhost", 8080);
    }
    const commentsCol = query(
      collection(db, "blogPosts"),
      where("slug", "==", slug)
    );
    const commentSnapshot = await getDocs(commentsCol);
    const commentList = commentSnapshot.docs.map((doc) =>
      doc.data()
    ) as Comment[];
    setComments(commentList);
  }

  useEffect(() => {
    getComments();
  }, []);
  return (
    <div>
      <h3>Comments</h3>
      {!comments || (comments.length === 0 && <span>No comments found</span>)}
      {comments && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment}>{comment.comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comment;
