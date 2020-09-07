import React, { useState } from "react";
import "./App.css";

const resource = {
  name: "testR",
  url: "https://www.google.com",
  tags: ["tag1", "tag2", "tag3"],
  author: "Josss Doebler",
  date: 11000,
};

// const tag = {
//   tags: ["react", "useEffect", "node"],
// };

function App() {
  const [resources, setResources] = useState([resource]);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");

  const createResource = () => {
    //check if data is valid
    if (name.trim() && url.trim() && tags.trim() && author.trim()) {
      const new_resource = {
        name,
        url,
        tags: tags.split(","),
        author,
        date: Date.now(),
      };

      setResources([new_resource, ...resources]);

      setName("");
      setUrl("");
      setTags("");
      setAuthor("");
    }
  };

  return (
    <div className="App">
      <h1>hello guest</h1>

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
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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

const Resource = ({ name, tags, url, author, date }) => (
  <div className="resource">
    <h4>
      <a href={url}> {name} </a>
    </h4>
    <div className="attributes">
      <span>
        <ul className="tags">
          {tags?.map((x) => (
            <li>{x}</li>
          ))}
        </ul>
      </span>
      <span> {author}</span>

      <span>{date}</span>
    </div>
  </div>
);

export default App;
