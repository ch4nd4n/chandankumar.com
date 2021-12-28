import React, { useEffect } from "react";
import { Button, Box, Heading } from "theme-ui";
import { CommentType } from "./CommentType";
import { deleteComment } from "./firebase-helper";

function getDatestring(d) {
  return new Date(d * 1000).toDateString();
}

async function confirmDelete(comment: CommentType, getComments: any) {
  const userConfirmationFlag = confirm(
    "Are you sure that you want to delete the comment?"
  );
  if (userConfirmationFlag) {
    await deleteComment(comment.id);
    await getComments();
  }
}

const Comment = (prop) => {
  const { getComments, comments, user } = prop;

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <Heading as="h3" sx={{ borderBottom: "1px solid", mb: 2 }}>
        Comments
      </Heading>
      <div>
        {comments.map((comment: CommentType) => (
          <div key={comment.id}>
            <Box p={1} sx={{ mb: [2] }}>
              <div>
                <img src={comment.authorPhoto} style={{ maxWidth: "25px" }} />
                <b style={{ marginRight: "5px" }}>{comment.authorName}</b>
                <span style={{ marginRight: 5 }}>
                  {getDatestring(comment.timestamp.seconds)}
                </span>
                {user && comment.authorId === user.uid && (
                  <Button
                    sx={{ p: 1, bg: "orangered" }}
                    onClick={async () => {
                      await confirmDelete(comment, getComments);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
              <p>{comment.comment}</p>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
