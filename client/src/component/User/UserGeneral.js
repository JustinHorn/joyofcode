import React from "react";

import List from "component/List";

const UserGeneral = ({ listClass, buttonClass, useQuery, component }) => {
  const { list, loading, error, addItems } = useQuery();

  if (error) {
    console.log(error);
    throw error;
  }
  if (loading) return "loading";

  return (
    <div className="">
      <div className={listClass}>
        <List Key="feed" Component={component} list={list || []} />
      </div>
      <button onClick={addItems} className={buttonClass}>
        load more
      </button>
    </div>
  );
};

export default UserGeneral;