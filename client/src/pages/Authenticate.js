import React, { useContext, useEffect } from "react";

import useGithubAuthentication from "hooks/useGithubAuthentication";

import useHistoryDeleteParam from "hooks/useHistoryDeleteParam";

import { Redirect, useLocation } from "react-router-dom";

import UserContext from "context/UserContext";

const AuthenticatePage = () => {
  const [mutate, { data, error }] = useGithubAuthentication();

  const { saveUserData, setUser } = useContext(UserContext);

  const location = useLocation();

  const { deleteParam } = useHistoryDeleteParam();

  useEffect(() => {
    if (urlHasRedirectPath(location)) {
      const code = getUrlParam(location, "code");
      if (code) {
        mutate({ variables: { code } });
        deleteParam("code"); // delete code param token so it does not get bookmarked since its expires
      }
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const { token, user } = data.authorizeWithGithub;
      saveUserData(token);
      setUser(user);
    }
  }, [data]);

  if (data || error) {
    return <Redirect to="/" />;
  }

  return <h1> Authenticate</h1>;
};

const urlHasRedirectPath = (location) => {
  return location.pathname.includes("/authenticate");
};

const getUrlParam = (location, param) => {
  const params = new URLSearchParams(location.search);
  return params.get(param);
};

export default AuthenticatePage;
