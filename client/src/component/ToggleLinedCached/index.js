import React, { useState, useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";

import ProjectLayoutContext from "context/ProjectLayout";

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

const ToggleLinedCached = ({ children, initLined }) => {
  const query = useQuery();

  const queryLined = query.get("lined");

  const history = useHistory();

  if (queryLined && (queryLined === "true" || queryLined === "false")) {
    initLined = queryLined === "true";
  }

  const [lined, setLined] = useState(!!initLined);

  useEffect(() => {
    if (lined) {
      query.set("lined", "true");
    } else {
      query.set("lined", "false");
    }
    history.replace(window.location.pathname + "?" + query.toString());
  }, [lined]);

  return (
    <div>
      <div className={"text-right"}>
        <button
          className={lined ? "selected" : ""}
          onClick={() => setLined(true)}
        >
          Lined
        </button>
        <button
          className={lined ? "" : "selected"}
          onClick={() => setLined(false)}
        >
          Cached
        </button>
      </div>
      <ProjectLayoutContext.Provider value={{ lined }}>
        {children}
      </ProjectLayoutContext.Provider>
    </div>
  );
};

export default ToggleLinedCached;
