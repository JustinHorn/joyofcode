import React, { useState, useContext, useEffect } from "react";

import UserContext from "context/UserContext";

import Icon from "component/icon/Icon";

const AuthenticationButtons = () => {
  const { loggedIn, logout } = useContext(UserContext);

  return (
    <div>
      {(!loggedIn && (
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
    </div>
  );
};

export default AuthenticationButtons;
