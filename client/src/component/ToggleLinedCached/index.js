import React, { useState } from "react";

const ToggleLinedCached = ({ children, initLined }) => {
  const [lined, setLined] = useState(!!initLined);

  return (
    <div>
      <div className={"text-right"}>
        <button
          className={lined ? "selected" : ""}
          onClick={() => setLined(true)}
        >
          Lined
        </button>
        <button
          className={lined ? "" : "selected"}
          onClick={() => setLined(false)}
        >
          Cached
        </button>
      </div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { lined }, null);
      })}
    </div>
  );
};

export default ToggleLinedCached;
