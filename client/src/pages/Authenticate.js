import React, { useEffect } from "react";

import useGithubAuthentication from "hooks/useGithubAuthentication";

import useHistoryDeleteParam from "hooks/useHistoryDeleteParam";

import { Redirect, useLocation } from "react-router-dom";

import UserContext from "context/UserContext";

const AuthenticatePage = () => {
  const [mutate, { data, error }] = useGithubAuthentication();

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

  if (data || error) {
    return <Redirect to="/" />;
  }

  return <h1>...authenticating</h1>;
};

const urlHasRedirectPath = (location) => {
  return location.pathname.includes("/authenticate");
};

const getUrlParam = (location, param) => {
  const params = new URLSearchParams(location.search);
  return params.get(param);
};

export default AuthenticatePage;
