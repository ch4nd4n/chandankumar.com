import React, { useEffect } from "react";
import { Box, Heading } from "theme-ui";

function getDatestring(d) {
  return new Date(d * 1000).toDateString();
}
const Comment = (prop) => {
  const { getComments, comments } = prop;

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <Heading as="h3" sx={{ borderBottom: "1px solid", mb: 2 }}>
        Comments
      </Heading>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Box p={1} sx={{ mb: [2] }}>
              <div>
                <b style={{ marginRight: "5px" }}>{comment.displayName}</b>
                {getDatestring(comment.timestamp.seconds)}
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
