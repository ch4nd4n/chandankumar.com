import React, { useState } from "react";
import { Button, Textarea, Box } from "theme-ui";

const AddComment = (props) => {
  const { addComment, getComments } = props;
  const [usrcomment, setUsrcomment] = useState<string>();
  return (
    <>
      <Textarea
        sx={{ mb: 2 }}
        value={usrcomment}
        onChange={(e) => setUsrcomment(e.currentTarget.value)}
      />
      <Box sx={{ textAlign: "right" }}>
        <Button
          onClick={() => {
            if (usrcomment.trim() === "") {
              return;
            }
            addComment(usrcomment.trim()).then((d) => {
              setUsrcomment("");
              getComments();
            });
          }}
        >
          Add Comment
        </Button>
      </Box>
    </>
  );
};

export default AddComment;
