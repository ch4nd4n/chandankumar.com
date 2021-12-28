import React, { useEffect } from "react";
import { Box, Heading } from "theme-ui";
import { CommentType } from "./CommentType";
import { deleteComment } from "./firebase-helper";

function getDatestring(d) {
  return new Date(d * 1000).toDateString();
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
                {getDatestring(comment.timestamp.seconds)}
                {user && comment.authorId === user.uid && (
                  <button
                    onClick={async () => {
                      await deleteComment(comment.id);
                      await getComments();
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div>{comment.comment}</div>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
