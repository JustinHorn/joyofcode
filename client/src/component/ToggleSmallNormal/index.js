import React, { useState } from "react";

const ToggleSmallNormal = ({ children, initSmall }) => {
  const [small, setSmall] = useState(!!initSmall);

  return (
    <div>
      <div>
        <button
          className={small ? "selected" : ""}
          onClick={() => setSmall(true)}
        >
          Small
        </button>
        <button
          className={small ? "" : "selected"}
          onClick={() => setSmall(false)}
        >
          {" "}
          Normal
        </button>
      </div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { small }, null);
      })}
    </div>
  );
};

export default ToggleSmallNormal;
