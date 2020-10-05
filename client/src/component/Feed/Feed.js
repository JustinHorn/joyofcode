import React, { useMemo, useState } from "react";

import styles from "./feed.module.css";

import Project from "component/Project";

import List from "component/List";

import useFeed from "hooks/useFeed";

const Feed = ({ filter, small }) => {
  !filter && (filter = () => true);

  const { data, loading, error, addItems } = useFeed();

  const projects = data?.feed.map((x) => ({
    ...x,
    showDescription: false,
    small,
  }));

  const filteredProjects = useMemo(() => projects?.filter(filter), [
    filter,
    projects,
  ]);

  if (error) {
    console.log(error);
    throw error;
  }
  if (loading) return "loading";

  return (
    <div>
      <div className={small ? "list px5" : styles.feed}>
        <List Key="feed" Component={Project} list={filteredProjects} />
      </div>
      <button onClick={addItems}>loadMore</button>
    </div>
  );
};

export default Feed;
