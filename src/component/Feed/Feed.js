import React, { useState } from "react";
import Resource from "component/Resource";
import styles from "./feed.modules.css";

const Feed = ({ resources }) => {
  const [filters, setFilters] = useState("");

  const doTagsApply = (resource) => {
    if (filters) {
      const tags = filters.split(",");
      for (let i = 0; i < tags.length; i++) {
        if (resource.tags.includes(tags[i])) return true;
      }
      return false;
    }
    return true;
  };

  return (
    <div className={styles.feed}>
      <input
        type="text"
        placeholder="filter"
        value={filters}
        onChange={(e) => setFilters(e.target.value)}
      ></input>
      {resources.filter(doTagsApply).map((x, index) => (
        <Resource key={index} {...x}></Resource>
      ))}
    </div>
  );
};

export default Feed;
