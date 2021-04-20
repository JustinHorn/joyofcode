import React, { useContext, useEffect } from "react";
import Project from "component/Project";

import List from "component/List";
import ProjectLayoutContext from "context/ProjectLayout";
import useOnView from "react-useonview";
import ReactLoading from "react-loading";

const UserProjects = ({ userId, queryProps }) => {
  !userId && (userId = "bsValue");

  const { lined } = useContext(ProjectLayoutContext);

  const { list, loading, error, addItems, old_loading } = queryProps;
  const viewTrigger = useOnView(addItems);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className="">
      <div className={lined ? "list px5" : "feed"}>
        <List Key="feed" Component={Project} list={list || []} />
      </div>
      <span
        ref={viewTrigger}
        onClick={addItems}
        className={(lined ? "my-10" : "my-20") + " load"}
      >
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

export default UserProjects;
