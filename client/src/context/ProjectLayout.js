import React, { useState } from "react";

const ProjectLayoutContext = React.createContext();

export default ProjectLayoutContext;

export const ProjectLayoutContextProvider = ({ defVal, children }) => {
  const [small, setSmall] = useState(!!defVal);

  return (
    <ProjectLayoutContext.Provider value={{ small, setSmall }}>
      {children}
    </ProjectLayoutContext.Provider>
  );
};
