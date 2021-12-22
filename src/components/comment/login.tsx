import React, { useState } from "react";
import { Button } from "theme-ui";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const Login = (props) => {
  const { auth } = props;
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [autherror, setAutherror] = useState<string>();

  const doFirebaseLogin = (event: React.FormEvent) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = (event: React.FormEvent) => {
    signInWithPopup(auth, provider)
      .then((result) => {})
      .catch((error) => {
        setAutherror(error.message);
      });
  };

  return (
    <>
      {autherror && <div>{autherror}</div>}
      <Button onClick={googleLogin}>Login with Google</Button>
    </>
  );
};

export default Login;
