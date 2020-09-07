import React, { useState } from "react";
import "./App.css";
import Resource from "component/Resource";
import { data } from "mockData";

function App() {
  const [resources, setResources] = useState(data.resources);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [postedBy, setPostedBy] = useState("");

  const createResource = () => {
    //check if data is valid
    if (name.trim() && url.trim() && tags.trim() && postedBy.trim()) {
      const new_resource = {
        name,
        url,
        tags: tags.split(","),
        postedBy,
        date: Date.now(),
      };

      setResources([new_resource, ...resources]);

      setName("");
      setUrl("");
      setTags("");
      setPostedBy("");
    }
  };

  return (
    <div className="App">
      <h1>LogBlocks</h1>
      {/* <p>A New Block-based Learning Approach</p> */}
      <div className="createResource">
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <input
          placeholder="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        ></input>
        <input
          placeholder="author"
          value={postedBy}
          onChange={(e) => setPostedBy(e.target.value)}
        ></input>
        <button onClick={createResource}>create new resource</button>
      </div>

      <div className="thread">
        {resources.map((x, index) => (
          <Resource key={index} {...x}></Resource>
        ))}
      </div>
    </div>
  );
}

export default App;
