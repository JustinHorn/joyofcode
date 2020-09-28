import React from "react";

const Tag = ({ text, onClick }) => (
  <li className={"tag"}>
    {text} <button onClick={onClick}>X</button>
  </li>
);

export default Tag;
