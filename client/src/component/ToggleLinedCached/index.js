import React, { useState, useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";

import ProjectLayoutContext from "context/ProjectLayout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div className={"text-left"}>
        <button
          className={(lined ? "selected" : "not-selected") + " iconButton"}
          onClick={() => setLined(true)}
        >
          <FontAwesomeIcon icon={["fas", "bars"]}> h</FontAwesomeIcon>
        </button>
        <button
          className={(lined ? "not-selected" : "selected") + " iconButton"}
          onClick={() => setLined(false)}
        >
          <FontAwesomeIcon icon={["fas", "th"]}> h</FontAwesomeIcon>
        </button>
      </div>
      <ProjectLayoutContext.Provider value={{ lined }}>
        {children}
      </ProjectLayoutContext.Provider>
    </div>
  );
};

export default ToggleLinedCached;
