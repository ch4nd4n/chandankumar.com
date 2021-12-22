import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = (props) => {
  const { auth } = props;
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const doFirebaseLogin = (event: React.FormEvent) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={doFirebaseLogin}>
        <label>Email</label>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default Login;
