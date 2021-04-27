import React, { useMemo, useContext, useEffect, useRef } from "react";

import styles from "./feed.module.css";

import Project from "component/Project";

import List from "component/List";

import useFeed from "hooks/useFeed";
import useHandleQuery from "helper/useHandleQuery";
import ProjectLayoutContext from "context/ProjectLayout";

import useDoOnView from "react-useonview";
import ReactLoading from "react-loading";

type Feed = {
  filter?: (x: any) => boolean;
};

const Feed = ({ filter }: Feed) => {
  const { data, addItems, loading, old_loading } = useFeed();
  const { lined } = useContext(ProjectLayoutContext);

  const projects = data?.feed.map((x: any) => ({
    ...x,
    showDescription: false,
  }));

  const filteredProjects = useMemo(
    () => projects?.filter(filter || ((x: any) => true)),
    [filter, projects]
  );

  const dotDotDot = (useDoOnView(
    addItems
  ) as unknown) as React.LegacyRef<HTMLSpanElement>;

  return (
    <div>
      <div className={lined ? "list px5  " : "feed"}>
        <List Key="feed" Component={Project} list={filteredProjects} />
      </div>
      <span ref={dotDotDot} onClick={addItems} className="load">
        {(loading && (
          <ReactLoading
            className="loader"
            color={"black"}
            type={old_loading ? "spin" : "bubbles"}
          />
        )) ||
          ". . ."}
      </span>
    </div>
  );
};

export default Feed;
