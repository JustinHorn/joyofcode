import React from "react";
import { Link } from "react-router-dom";
import { formatTimeDiff } from "helper";

const LikeMenu = ({ id, date, title }) => {
  return (
    <span>
      <Link to={"/project/" + id}>{title}</Link>
      {` was liked
  ${formatTimeDiff(date)} ago`}
    </span>
  );
};

export default LikeMenu;
