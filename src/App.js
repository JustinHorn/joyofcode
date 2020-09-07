import React, { useState } from "react";
import "./App.css";
import { data } from "mockData";
import Resource from "component/Resource";
import CreateResource from "component/CreateResource";
import { useResources } from "helper";

function App() {
  const { resources, createResource } = useResources(data);

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
    <div className="App">
      <h1>Hello</h1>
      <CreateResource createResource={createResource} />

      <div className="thread">
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
    </div>
  );
}

export default App;
