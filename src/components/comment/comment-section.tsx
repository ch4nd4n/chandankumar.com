import React, { useState } from "react";
import { Box, Container } from "theme-ui";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  connectFirestoreEmulator,
  getFirestore,
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
import {
  addComment,
  createOrUpdateProfile,
  getComments,
  updateProfile,
} from "./firebase-helper";
import UpdateProfile from "./update-profile";

export type CommentProp = {
  slug: string;
};

export let app, db;

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

const CommentSection = (prop: CommentProp) => {
  const { slug } = prop;
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  onAuthStateChanged(auth, async (usr) => {
    await createOrUpdateProfile(usr);
    usr ? setUser(usr) : setUser(null);
  });

  async function fetchComments() {
    const commentList = await getComments(slug);
    setComments(commentList);
  }

  function saveComment(comment) {
    return addComment(slug, user, comment);
  }

  function updateUserProfile(updatedDisplayName) {
    updateProfile(user, updatedDisplayName);
  }

  return (
    <Container>
      <CommentList
        getComments={fetchComments}
        comments={comments}
        user={user}
      />
      {!user && <Login auth={auth} />}
      {user && (
        <>
          <Box sx={{ mb: 3, mt: 3, textAlign: "right" }}>
            <span>
              <UpdateProfile user={user} updateProfile={updateUserProfile} />
            </span>
            <Signout auth={auth} setUser={setUser} />
          </Box>
          <AddComment
            user={user}
            addComment={saveComment}
            getComments={fetchComments}
          />
        </>
      )}
    </Container>
  );
};

export default CommentSection;
