import { useState, useContext } from "react";
import Feed from "component/Feed";

import UserContext from "context/UserContext";

import TagInput from "component/forms/Inputs/TagInput";

import styles from "./styles/mainPage.module.css";
import ProjectLayoutContext from "context/ProjectLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLinedCached from "hooks/useLinedCached";

const MainPage = () => {
  const { user } = useContext(UserContext);

  const [filters, setFilters] = useState({
    value: [],
    placeholder: "filter by tag",
  });

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

  const setValue = (x) => {
    setFilters({ ...filters, value: x });
  };

  const [lined, setLined] = useLinedCached(false);

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
              className={(lined ? "selected" : "not-selected") + " iconButton"}
              onClick={() => setLined(true)}
            >
              <FontAwesomeIcon icon={["fas", "bars"]}> </FontAwesomeIcon>
            </button>
            <button
              className={(lined ? "not-selected" : "selected") + " iconButton"}
              onClick={() => setLined(false)}
            >
              <FontAwesomeIcon icon={["fas", "th"]}></FontAwesomeIcon>
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

export default MainPage;
