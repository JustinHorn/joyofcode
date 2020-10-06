import React from "react";

const LinkIcon = ({ src, href, className }) => {
  return (
    <a href={href}>
      <div
        className={"icon " + className}
        style={{ backgroundImage: "url(" + src + ")" }}
      ></div>
    </a>
  );
};

export default LinkIcon;
