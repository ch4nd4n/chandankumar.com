import React from "react";
import { useState } from "react";

import { Box, Link, Input, Button, Label } from "theme-ui";

export default function UpdateProfile(props) {
  const { user, updateProfile } = props;
  const [displayName, setDisplayName] = useState("");
  const [editable, setEditable] = useState(false);

  function updateProfileLogic(e: React.FormEvent) {
    e.preventDefault();
    setEditable(!editable);
  }

  function cancelEdit(e: React.FormEvent) {
    e.preventDefault();
    setEditable(false);
  }

  return (
    <>
      <Link
        href="#"
        onClick={updateProfileLogic}
        sx={{ mr: 3 }}
        title="Edit Profile"
      >
        {!editable && <span>{user.displayName}</span>}
      </Link>
      {editable && (
        <Box sx={{ mb: 4, border: "1px solid", p: 4 }}>
          <Label htmlFor="displayName">Display name</Label>
          <Box>
            <Input
              sx={{ mb: 2 }}
              id="displayName"
              placeholder="Change display name for comments"
              onChange={(e) => setDisplayName(e.currentTarget.value)}
            />
            <Button
              sx={{ p: 1, mr: 2 }}
              onClick={async () => {
                await updateProfile(displayName);
                setEditable(false);
              }}
            >
              Save
            </Button>
            <Link href="#" onClick={cancelEdit}>
              Cancel
            </Link>
          </Box>
        </Box>
      )}
    </>
  );
}
