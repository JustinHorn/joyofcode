import React, { useState, useContext } from "react";
import styles from "./createresource.module.css";

import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/client";

const ADDResource_Mutation = gql`
  mutation addResource(
    $author: String!
    $title: String!
    $href: String!
    $tags: [String!]!
  ) {
    addResource(author: $author, title: $title, href: $href, tags: $tags) {
      title
      author
      href
      date
      tags {
        name
      }
    }
  }
`;

const CreateResource = ({}) => {
  const [mutate, { error, data }] = useMutation(ADDResource_Mutation);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [postedBy, setPostedBy] = useState("");

  const create = () => {
    if (name.trim() && url.trim() && tags.trim() && postedBy.trim()) {
      const variables = {
        author: postedBy.trim(),
        href: url.trim(),
        tags: tags.trim().split(","),
        title: name.trim(),
      };

      mutate({ variables });

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
