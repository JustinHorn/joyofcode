import React, { useState, useContext } from "react";
import Resource from "component/Resource";
import styles from "./feed.module.css";

import ResourceContext from "context/ResourcesContext";

const Feed = ({}) => {
  const { resources, deleteResource } = useContext(ResourceContext);
  const [filters, setFilters] = useState("");

  const doTagsApply = (resource) => {
    if (filters) {
      const tags = filters.split(",");
      for (let i = 0; i < resource.tags.length; i++) {
        if (tags.includes(resource.tags[i])) return true;
      }
      return false;
    }
    return true;
  };

  return (
    <div className={styles.feed}>
      <input
        className={styles.filter}
        type="text"
        placeholder="filter"
        value={filters}
        onChange={(e) => setFilters(e.target.value)}
      />
      {resources.filter(doTagsApply).map((x, index) => (
        <Resource key={index} {...x} deleteResource={deleteResource}></Resource>
      ))}
    </div>
  );
};

export default Feed;
