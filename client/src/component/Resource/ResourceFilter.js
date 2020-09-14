import React, { useState } from "react";

import Resource from "component/Resource";

const ResourceFilter = ({ resources }) => {
  const [filters, setFilters] = useState("");

  const doTagsApply = (resource) => {
    if (filters) {
      const tags = filters.split(",");
      for (let i = 0; i < resource.tags.length; i++) {
        if (tags.includes(resource.tags[i].name)) return true;
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
