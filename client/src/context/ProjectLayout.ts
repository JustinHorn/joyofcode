import React from "react";

export type ProjectLayoutContextContent = {
  lined: boolean | undefined;
};

const ProjectLayoutContext = React.createContext<ProjectLayoutContextContent>({
  lined: undefined,
});

export default ProjectLayoutContext;
