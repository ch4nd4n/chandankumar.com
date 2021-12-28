import React, { useState } from "react";

const AddComment = (props) => {
  const { addComment } = props;
  const [usrcomment, setUsrcomment] = useState<string>();
  return (
    <>
      <textarea onChange={(e) => setUsrcomment(e.currentTarget.value)} />
      <button
        onClick={() => {
          addComment(usrcomment);
        }}
      >
        Add Comment
      </button>
    </>
  );
};

export default AddComment;
