import React, { useState, useContext, useEffect } from "react";
import Authentication from "./Authentication";
import Popup from "component/Popup";

import UserContext from "context";

import Icon from "component/icon/Icon";

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
      {(!user && (
        <button>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user`} //its okay to expose the client_id
            className="flex align-center"
          >
            <Icon location={"/img/icons/github.png"} />
            <span>Authentication </span>
          </a>
        </button>
      )) || <button onClick={logout}>Logout</button>}
      <Popup show={show !== "not"} onClickAway={() => setShow("not")}>
        <Authentication isLogin={show === "Login"} />
      </Popup>
    </div>
  );
};

export default AuthenticationButtons;
