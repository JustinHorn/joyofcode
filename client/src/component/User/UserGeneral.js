import React, { useEffect } from "react";

import List from "component/List";

const UserGeneral = ({ listClass, buttonClass, useQuery, component }) => {
  const { list, loading, error, addItems, take } = useQuery();

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);
  if (loading) return "loading";

  return (
    <div className="">
      <div className={listClass}>
        <List Key="feed" Component={component} list={list || []} />
      </div>
      <span onClick={addItems} className={buttonClass + " load"}>
        ...
      </span>
    </div>
  );
};

export default UserGeneral;
