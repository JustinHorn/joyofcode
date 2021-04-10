import React, { useEffect } from "react";

import List from "component/List";
import useOnView from "react-useonview";
import ReactLoading from "react-loading";

const UserGeneral = ({ listClass, buttonClass, useQuery, component }) => {
  const { list, loading, error, addItems, old_loading } = useQuery();

  const viewTrigger = useOnView(addItems);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

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

export default UserGeneral;
