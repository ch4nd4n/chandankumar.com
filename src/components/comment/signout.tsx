import React from "react";
import { Button } from "theme-ui";

const Signout = (props) => {
  const { auth, setUser } = props;
  return (
    <Button
      variant="secondary"
      onClick={() =>
        auth.signOut().then(() => {
          setUser(null);
        })
      }
    >
      Logout
    </Button>
  );
};

export default Signout;
