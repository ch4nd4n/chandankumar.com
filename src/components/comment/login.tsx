import React, { useState } from "react";
import { Button } from "theme-ui";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Login = (props) => {
  const { auth } = props;
  const [autherror, setAutherror] = useState<string>();

  const googleLogin = () => {
    signInWithPopup(auth, provider).catch((error) => {
      setAutherror(error.message);
    });
  };

  return (
    <>
      {autherror && <div>{autherror}</div>}
      <Button onClick={googleLogin}>Leave a comment</Button>
    </>
  );
};

export default Login;
