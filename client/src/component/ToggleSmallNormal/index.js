import React, { useState } from "react";

const ToggleSmallNormal = ({ children, initSmall }) => {
  const [small, setSmall] = useState(!!initSmall);

  return (
    <div>
      <button onClick={() => setSmall(true)}>Small</button>
      <button onClick={() => setSmall(false)}> Normal</button>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { small }, null);
      })}
    </div>
  );
};

export default ToggleSmallNormal;
