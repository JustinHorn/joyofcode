import React from "react";

import List from "component/List";

const UserGeneral = ({ listClass, buttonClass, useQuery, component }) => {
  const { list, loading, error, addItems } = useQuery();

  if (error) {
    console.log(error);
    alert(error);
  }
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
