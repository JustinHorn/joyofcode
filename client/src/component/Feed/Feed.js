import React, { useState, useContext } from "react";
import Resource from "component/Resource";
import styles from "./feed.module.css";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

const FeedQuery = gql`
  query {
    feed {
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

const Feed = ({}) => {
  const { data, loading, error } = useQuery(FeedQuery);

  const [filters, setFilters] = useState("");

  const doTagsApply = (resource) => {
    if (filters) {
      const tags = filters.split(",");
      for (let i = 0; i < resource.tags.length; i++) {
        if (tags.includes(resource.tags[i])) return true;
      }
      return false;
    }
    return true;
  };

  console.log(data);

  if (error) {
    console.log(error);
    return "error";
  }
  if (loading) return "loading";

  return (
    <div className={styles.feed}>
      <input
        className={styles.filter}
        type="text"
        placeholder="filter"
        value={filters}
        onChange={(e) => setFilters(e.target.value)}
      />
      {data.feed.filter(doTagsApply).map((x, index) => (
        <Resource key={index} {...x}></Resource>
      ))}
    </div>
  );
};

export default Feed;
