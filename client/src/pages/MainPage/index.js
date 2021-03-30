import React, { useState, useContext, useEffect } from "react";
import Feed from "component/Feed";

import UserContext from "context";
import { useLocation, useHistory } from "react-router-dom";

import TagInput from "component/forms/Inputs/TagInput";

import styles from "./mainpage.module.css";
import ProjectLayoutContext from "context/ProjectLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ToggleLinedCached from "component/ToggleLinedCached";
function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

const Mainpage = () => {
  const { user } = useContext(UserContext);

  const [filters, setFilters] = useState({ value: [], placeholder: "filter" });

  const filter = (resource) => {
    if (filters.value.length) {
      const tags = filters.value.map((x) => x.toLowerCase());
      const r_tags = resource.tags.map((x) => x.name.toLowerCase());
      for (let i = 0; i < r_tags.length; i++) {
        for (let j = 0; j < tags.length; j++) {
          if (r_tags.includes(tags[j])) return true;
        }
      }
      return false;
    }
    return true;
  };

  const query = useQuery();

  const queryLined = query.get("lined");

  let initLined = false;

  if (queryLined && (queryLined === "true" || queryLined === "false")) {
    initLined = queryLined === "true";
  }

  const setValue = (x) => {
    setFilters({ ...filters, value: x });
  };

  const [lined, setLined] = useState(!!initLined);

  const history = useHistory();
  useEffect(() => {
    if (lined) {
      query.set("lined", "true");
    } else {
      query.set("lined", "false");
    }
    history.replace(window.location.pathname + "?" + query.toString());
  }, [lined]);

  return (
    <div className={styles.main}>
      <div className={styles.greet}>{<h2>Hello {user?.name} </h2>}</div>

      <div className={styles.feed}>
        <div className={styles.searchbarLayout}>
          <TagInput
            className={styles.searchbar}
            formValue={filters}
            setSpecificFormValue={setValue}
          />
          <div>
            <button
              className={(lined ? "" : "not-selected") + " iconButton"}
              onClick={() => setLined(true)}
            >
              <FontAwesomeIcon icon={["fas", "bars"]}> h</FontAwesomeIcon>
            </button>
            <button
              className={(lined ? "not-selected" : "") + " iconButton"}
              onClick={() => setLined(false)}
            >
              <FontAwesomeIcon icon={["fas", "th"]}> h</FontAwesomeIcon>
            </button>
          </div>
        </div>
        <ProjectLayoutContext.Provider value={{ lined }}>
          <Feed filter={filter} />
        </ProjectLayoutContext.Provider>
      </div>
    </div>
  );
};

export default Mainpage;
