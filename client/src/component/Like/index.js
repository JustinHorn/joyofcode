import React from "react";
import { Link } from "react-router-dom";
import { formatTimeDiff } from "helper";

const LikeMenu = ({ date, project }) => {
  return (
    <span>
      <Link to={"/project/" + project.id}>{project.title}</Link>
      {` was liked
  ${formatTimeDiff(date)} ago`}
    </span>
  );
};

export default LikeMenu;
