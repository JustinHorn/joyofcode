import React, { useState, useEffect, useContext } from "react";

import { useLoginOrRegister } from "hooks";

import styles from "./authentication.module.css";

const Authentication = ({ isLogin }) => {
  const { mutate } = useLoginOrRegister(isLogin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const authenticate = () => {
    mutate({ variables: { email, password, name } });
  };

  return (
    <div className={styles.main}>
      <>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {!isLogin && (
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <button onClick={authenticate}>{isLogin ? "Login" : "Register"}</button>
      </>
    </div>
  );
};

export default Authentication;
