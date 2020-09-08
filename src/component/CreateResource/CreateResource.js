import React, { useState } from "react";
import styles from "./createresource.module.css";

const CreateResource = ({ createResource }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [postedBy, setPostedBy] = useState("");

  const create = () => {
    if (createResource(name, url, tags, postedBy)) {
      setName("");
      setUrl("");
      setTags("");
      setPostedBy("");
    }
  };

  return (
    <div className={styles.createResource}>
      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        placeholder="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        placeholder="posted by"
        value={postedBy}
        onChange={(e) => setPostedBy(e.target.value)}
      />
      <button onClick={create}>create new resource</button>
    </div>
  );
};

export default CreateResource;
