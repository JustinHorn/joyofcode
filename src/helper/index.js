import React, { useState } from "react";

export const useResources = (data) => {
  const [resources, setResources] = useState(data.resources);

  const createResource = (name, url, tags, postedBy) => {
    if (name.trim() && url.trim() && tags.trim() && postedBy.trim()) {
      const new_resource = {
        name,
        url,
        tags: tags.split(","),
        postedBy,
        date: Date.now(),
      };
      setResources([new_resource, ...resources]);
      return true;
    }
    return false;
  };

  return { resources, createResource };
};
