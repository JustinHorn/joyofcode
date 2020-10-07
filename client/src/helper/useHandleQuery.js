import React, { useEffect } from "react";

const useHandleQuery = (props, Query, Component, queryProps) => {
  const query = Query(queryProps);
  const { loading, error } = query;

  useEffect(() => {
    if (error) {
      console.log(error);
      alert(error);
    }
  }, [error]);

  if (loading) return "loading";

  return <Component {...props} query={query} />;
};

export default useHandleQuery;
