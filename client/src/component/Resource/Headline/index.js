import React from "react";
import Url from "url-parse";

const Headline = ({ href, title }) => {
  const hostname = new Url(href).hostname;

  return (
    <>
      <h2>{title}</h2>
      <h4>
        <a href={href}> ({hostname})</a>{" "}
      </h4>
    </>
  );
};

export default Headline;
