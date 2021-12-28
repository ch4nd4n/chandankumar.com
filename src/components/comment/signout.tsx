import React from "react";
import { Button } from "theme-ui";

const Signout = (props) => {
  const { auth, setUser } = props;
  return (
    <Button
      sx={{ fontSize: [14, 18], p: 2, bg: "orangered" }}
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
