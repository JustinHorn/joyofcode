import React, { useState, useContext, useEffect } from "react";
import Authentication from "./Authentication";
import Popup from "component/Popup";

import UserContext from "context";

const AuthenticationButtons = () => {
  const [show, setShow] = useState("not");

  const getOnClick = (type) => () => {
    if (type === show) {
      setShow("not");
    } else {
      setShow(type);
    }
  };

  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    setShow("not");
  }, [user]);

  return (
    <div>
      {(!user &&
        ["Login", "Register"].map((option, index) => (
          <button
            key={index}
            type="checkbox"
            className={option === show ? "active" : ""}
            onClick={getOnClick(option)}
          >
            {option}
          </button>
        ))) || <button onClick={logout}>Logout</button>}
      <Popup show={show !== "not"} onClickAway={() => setShow("not")}>
        <Authentication isLogin={show === "Login"} />
      </Popup>
    </div>
  );
};

export default AuthenticationButtons;
