import React, { useEffect } from "react";

const Comment = (prop) => {
  const { getComments, comments } = prop;

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
