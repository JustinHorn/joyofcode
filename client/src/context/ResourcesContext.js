import React, { useState, useEffect } from "react";

const ResourceContext = React.createContext([]);

export default ResourceContext;

export const ResourceContextProvider = ({ children }) => {
  return (
    <ResourceContext.Provider value={{ name: "hi" }}>
      {children}
    </ResourceContext.Provider>
  );
};

// Math.max(a,b) => returns the greater of the two
