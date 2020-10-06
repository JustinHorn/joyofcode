import React, { useMemo, useState } from "react";

import styles from "./feed.module.css";

import Project from "component/Project";

import List from "component/List";

import useFeed from "hooks/useFeed";
import useHandleQuery from "helper/useHandleQuery";

const Feed = ({ filter, lined, query }) => {
  !filter && (filter = () => true);

  const { data, addItems } = query;

  const projects = data?.feed.map((x) => ({
    ...x,
    showDescription: false,
    lined,
  }));

  const filteredProjects = useMemo(() => projects?.filter(filter), [
    filter,
    projects,
  ]);

  return (
    <div>
      <div className={lined ? "list px5  " : "feed"}>
        <List Key="feed" Component={Project} list={filteredProjects} />
      </div>
      <span onClick={addItems} className="load">
        . . .
      </span>
    </div>
  );
};

export default (props) => useHandleQuery(props, useFeed, Feed);
