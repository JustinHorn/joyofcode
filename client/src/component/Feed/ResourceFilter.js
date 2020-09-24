import React, { useState } from "react";

import Resource from "component/Resource";

const ResourceFilter = ({ resources }) => {
  const [filters, setFilters] = useState("");

  const doTagsApply = (resource) => {
    if (filters) {
      const tags = filters.split(",").map((x) => x.toLowerCase());
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

  return (
    <>
      <input
        style={{ width: "100%" }}
        type="text"
        placeholder="search"
        value={filters}
        onChange={(e) => setFilters(e.target.value)}
      />
      {resources.filter(doTagsApply).map((x, index) => (
        <Resource key={index} {...x}></Resource>
      ))}
    </>
  );
};

export default ResourceFilter;
