import React, { useEffect } from "react";

import List from "component/List";
import useDoOnView from "hooks/useDoOnView";

const UserGeneral = ({ listClass, buttonClass, useQuery, component }) => {
  const { list, loading, error, addItems, take } = useQuery();

  const viewTrigger = useDoOnView(addItems);

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
      <span
        ref={viewTrigger}
        onClick={addItems}
        className={buttonClass + " load"}
      >
        ...
      </span>
    </div>
  );
};

export default UserGeneral;
