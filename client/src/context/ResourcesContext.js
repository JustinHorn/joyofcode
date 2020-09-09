import React, { useState, useEffect } from "react";

import { data } from "mockData";

import { getMaxId } from "helper";

const ResourceContext = React.createContext([]);

export default ResourceContext;

const storageResources = JSON.parse("" + localStorage.getItem("resources"));

let start_resources = storageResources?.length
  ? storageResources
  : data.resources;

let maxId = localStorage.getItem("nextId");
if (maxId) {
  maxId = Number(maxId);
} else {
  maxId = getMaxId(start_resources) + 1;
}

export const ResourceContextProvider = ({ children }) => {
  const [resources, setResources] = useState(start_resources);

  const [nextId, setNextId] = useState(maxId);

  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem("nextId", nextId);
  }, [nextId]);

  const createResource = (name, url, tags, postedBy) => {
    if (name.trim() && url.trim() && tags.trim() && postedBy.trim()) {
      const new_resource = {
        id: nextId,
        name,
        url,
        tags: tags.split(","),
        postedBy,
        date: Date.now(),
      };
      setNextId(nextId + 1);
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

  return (
    <ResourceContext.Provider
      value={{ resources, createResource, deleteResource }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

// Math.max(a,b) => returns the greater of the two
