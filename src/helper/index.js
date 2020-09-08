import React, { useState, useEffect } from "react";

import { data } from "mockData";

const storageResources = JSON.parse("" + localStorage.getItem("resources"));

let start_resources = storageResources?.length
  ? storageResources
  : data.resources;

export const useResources = () => {
  const [resources, setResources] = useState(start_resources);

  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources));
  }, [resources]);

  const createResource = (name, url, tags, postedBy) => {
    if (name.trim() && url.trim() && tags.trim() && postedBy.trim()) {
      const maxId = getMaxId(resources);
      const new_resource = {
        id: maxId + 1,
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

  const deleteResource = (id) => {
    const index = resources.findIndex((x) => x.id === id);
    console.log(index);
    if (index > -1) {
      const new_resources = [...resources];
      new_resources.splice(index, 1);
      setResources(new_resources);
    }
  };

  return { resources, createResource, deleteResource };
};

// Math.max(a,b) => returns the greater of the two
const getMaxId = (resources) => {
  let max = 0;
  // let max = [];
  for (let i = 0; i < resources.length; i++) {
    max = Math.max(max, resources[i].id);
  }
  return max;
};
