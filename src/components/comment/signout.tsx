import React from "react";

const Signout = (props) => {
  const { auth, setUser } = props;
  return (
    <button
      onClick={() =>
        auth.signOut().then(() => {
          setUser(null);
        })
      }
    >
      Logout
    </button>
  );
};

export default Signout;
