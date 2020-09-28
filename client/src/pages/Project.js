import React from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1> This is the project page of {id}</h1>
    </div>
  );
};

export default ProjectPage;
